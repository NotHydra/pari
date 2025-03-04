import datetime
import os
import requests
import RPi.GPIO as GPIO
import time

from dotenv import load_dotenv
from requests import Response
from rfid.reader import Reader
from rfid.response import ResponseInventory
from rfid.reader_settings import (
    Antenna,
    BaudRate,
    ReaderSettings,
    RfidProtocol,
    WorkMode,
    OutputInterface,
    Wiegand,
    WiegandProtocol,
    WiegandByteFirstType,
    MemoryBank,
    Frequency,
    Session,
    REGION_MALAYSIA,
    AnswerModeInventoryParameter,
    StopAfter,
)
from rfid.status import InventoryStatus
from rfid.transport import SerialTransport
from rfid.utils import calculate_rssi, hex_readable
from rpi_lcd import LCD as LCDRPi
from typing import Iterator

load_dotenv()


def log(message: str) -> None:
    print(f"[{datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] {message}")


try:
    SERVER_URL: str = os.getenv("SERVER_URL")

    BUTTON_GREEN_PIN: int = 16
    BUTTON_YELLOW_PIN: int = 20
    BUTTON_RED_PIN: int = 21

    TRAFFIC_LIGHT_GREEN_PIN: int = 25
    TRAFFIC_LIGHT_YELLOW_PIN: int = 8
    TRAFFIC_LIGHT_RED_PIN: int = 7

    LCD: LCDRPi = LCDRPi()

    GPIO.setmode(GPIO.BCM)
    GPIO.setwarnings(False)

    GPIO.setup(BUTTON_GREEN_PIN, GPIO.IN, pull_up_down=GPIO.PUD_UP)
    GPIO.setup(BUTTON_YELLOW_PIN, GPIO.IN, pull_up_down=GPIO.PUD_UP)
    GPIO.setup(BUTTON_RED_PIN, GPIO.IN, pull_up_down=GPIO.PUD_UP)

    GPIO.setup(TRAFFIC_LIGHT_GREEN_PIN, GPIO.OUT)
    GPIO.setup(TRAFFIC_LIGHT_YELLOW_PIN, GPIO.OUT)
    GPIO.setup(TRAFFIC_LIGHT_RED_PIN, GPIO.OUT)

    log("Initializing Reader")
    LCD.text("Reader:", 1)
    LCD.text("Initializing", 2)
    time.sleep(1)

    PORTS: list[str] = SerialTransport.scan()
    log(f"Ports: {PORTS}")

    PORT: str = PORTS[0]
    log(f"Port: {PORT}")

    TRANSPORT: SerialTransport = SerialTransport(
        serial_port=PORT, baud_rate=BaudRate.BPS_115200, timeout=1
    )
    log(f"Transport: {TRANSPORT}")

    READER: Reader = Reader(TRANSPORT)
    log("Reader Initialized")
    LCD.text("Reader:", 1)
    LCD.text("Initialized", 2)
    time.sleep(1)

    while True:
        LCD.text("Reader:", 1)
        LCD.text("Select A Mode", 2)

        GPIO.output(TRAFFIC_LIGHT_GREEN_PIN, GPIO.LOW)
        GPIO.output(TRAFFIC_LIGHT_YELLOW_PIN, GPIO.LOW)
        GPIO.output(TRAFFIC_LIGHT_RED_PIN, GPIO.HIGH)

        if GPIO.input(BUTTON_YELLOW_PIN) == GPIO.LOW:
            log("ID Mode Starting")

            GPIO.output(TRAFFIC_LIGHT_GREEN_PIN, GPIO.LOW)
            GPIO.output(TRAFFIC_LIGHT_YELLOW_PIN, GPIO.HIGH)
            GPIO.output(TRAFFIC_LIGHT_RED_PIN, GPIO.LOW)

            LCD.text("ID Mode:", 1)
            LCD.text("Starting", 2)
            time.sleep(1)

            READER.set_reader_settings(
                ReaderSettings(
                    address=0,
                    rfid_protocol=RfidProtocol.ISO_18000_6C,
                    work_mode=WorkMode.ACTIVE_MODE,
                    output_interface=OutputInterface.USB,
                    baud_rate=BaudRate.BPS_115200,
                    wiegand=Wiegand(
                        is_open=False,
                        byte_first_type=WiegandByteFirstType.LOW_BYTE_FIRST,
                        protocol=WiegandProtocol.WG_26,
                    ),
                    antenna=Antenna(
                        ant_1=True,
                        ant_2=False,
                        ant_3=False,
                        ant_4=False,
                        ant_5=False,
                        ant_6=False,
                        ant_7=False,
                        ant_8=False,
                    ),
                    frequency=Frequency(
                        region=REGION_MALAYSIA,
                        min_frequency=919.5,
                        max_frequency=922.5,
                    ),
                    power=30,
                    output_memory_bank=MemoryBank.EPC,
                    q_value=4,
                    session=Session.SESSION_0,
                    output_start_address=0,
                    output_length=12,
                    filter_time=0,
                    trigger_time=3,
                    buzzer_time=True,
                    inventory_interval=100,
                )
            )

            response: Iterator[ResponseInventory] | None = READER.start_inventory(
                work_mode=WorkMode.ANSWER_MODE,
                answer_mode_inventory_parameter=(
                    AnswerModeInventoryParameter(
                        stop_after=StopAfter.NUMBER,
                        value=10,
                    )
                ),
            )

            fail: bool = False
            count: int = 1
            rssi_value: float | None = None
            for res in response:
                if res is None:
                    count += 1
                    if count > 5:
                        fail = True
                        break

                    continue

                if res.status == InventoryStatus.SUCCESS and res.tag:
                    LCD.text("ID Mode:", 1)
                    LCD.text("Obtained", 2)
                    time.sleep(1)

                    response_tag: Response | None = None
                    try:
                        response_tag = requests.get(
                            f"{SERVER_URL}/api/tag/rssi-by-tag/{hex_readable(res.tag.data).replace(' ', '-')}",
                            timeout=5,
                        )

                    except Exception as e:
                        log(f"Response: {e}")
                        LCD.text(f"ID Mode:", 1)
                        LCD.text("GET Fail", 2)
                        time.sleep(1)
                        break

                    if (response_tag is None) or (response_tag.json()["data"] is None):
                        log(f"Invalid Response")
                        LCD.text(f"ID Mode:", 1)
                        LCD.text("GET Invalid", 2)
                        time.sleep(1)
                        break

                    log(f"GET Response: {response_tag.json()}")

                    rssi_value = response_tag.json()["data"]
                    if rssi_value is not None:
                        break

                if (
                    res.status == InventoryStatus.NO_COUNT_LABEL
                    and READER.work_mode == WorkMode.ANSWER_MODE
                ):
                    break

            if fail:
                log(f"ID Mode Fail")
                LCD.text("ID Mode:", 1)
                LCD.text("Fail", 2)
                print()

            else:
                log(f"RSSI Value: {rssi_value}")
                LCD.text("RSSI Value:", 1)
                LCD.text(f"{rssi_value}dBm", 2)
                print()

            log("Finished")
            print()

            while True:
                if GPIO.input(BUTTON_RED_PIN) == GPIO.LOW:
                    break

                time.sleep(0.5)

        elif GPIO.input(BUTTON_GREEN_PIN) == GPIO.LOW:
            log("RSSI Mode Starting")

            GPIO.output(TRAFFIC_LIGHT_GREEN_PIN, GPIO.HIGH)
            GPIO.output(TRAFFIC_LIGHT_YELLOW_PIN, GPIO.LOW)
            GPIO.output(TRAFFIC_LIGHT_RED_PIN, GPIO.LOW)

            LCD.text("RSSI Mode:", 1)
            LCD.text("Starting", 2)
            time.sleep(1)

            response_configuration: Response | None = None
            try:
                response_configuration = requests.get(
                    f"{SERVER_URL}/api/active-reader-configuration/configuration",
                    timeout=5,
                )

            except Exception as e:
                log(f"GET Response: {e}")
                LCD.text("RSSI Mode:", 1)
                LCD.text("GET Fail", 2)
                time.sleep(1)
                break

            if (response_configuration is None) or (
                response_configuration.json()["data"] is None
            ):
                log(f"GET Response: Invalid")
                LCD.text("RSSI Mode:", 1)
                LCD.text("GET Invalid", 2)
                time.sleep(1)
                break

            log(f"GET Response: {response_configuration.json()}")
            configuration_id: int = response_configuration.json()["data"]["id"]
            configuration_name: str = response_configuration.json()["data"]["name"]
            configuration_rssi_scan_count: int = response_configuration.json()["data"][
                "rssiScanCount"
            ]
            configuration_rssi_scan_interval: int = (
                response_configuration.json()["data"]["rssiScanInterval"] / 1000
            )
            configuration_frequency_configuration_list: list[str] = (
                response_configuration.json()["data"]["frequencyConfiguration"]
            )

            log("Config")
            log(f"ID: {configuration_id}")
            LCD.text("Config ID:", 1)
            LCD.text(str(configuration_id), 2)
            time.sleep(1)

            log(f"Name: {configuration_name}")
            LCD.text("Config Name:", 1)
            LCD.text(configuration_name, 2)
            time.sleep(1)

            log(f"Scan Count: {configuration_rssi_scan_count}")
            LCD.text("Scan Count:", 1)
            LCD.text(str(configuration_rssi_scan_count), 2)
            time.sleep(1)

            log(f"Scan Interval: {configuration_rssi_scan_interval}")
            LCD.text("Scan Interval:", 1)
            LCD.text(str(configuration_rssi_scan_interval), 2)
            time.sleep(1)

            log(f"Frequency Count: {len(configuration_frequency_configuration_list)}")
            log(f"Frequency: {configuration_frequency_configuration_list}")
            LCD.text("Frequency Count:", 1)
            LCD.text(str(len(configuration_frequency_configuration_list)), 2)
            time.sleep(1)

            response_tag: Response | None = None
            try:
                response_tag = requests.post(
                    f"{SERVER_URL}/api/tag",
                    json={"readerConfigurationId": configuration_id},
                    timeout=5,
                )

            except Exception as e:
                log(f"POST Response: {e}")
                LCD.text("RSSI Mode:", 1)
                LCD.text("POST Fail", 2)
                time.sleep(1)
                break

            if (
                (response_tag is None)
                or (response_tag.json()["data"] is None)
                or (response_tag.json()["data"]["id"] is None)
            ):
                log(f"POST Response: Invalid")
                LCD.text("RSSI Mode:", 1)
                LCD.text("POST Invalid", 2)
                time.sleep(1)
                break

            log(f"POST Response: {response_tag.json()}")
            tag_id: int = response_tag.json()["data"]["id"]
            LCD.text("RSSI Mode:", 1)
            LCD.text(f"New ID {tag_id}", 2)

            stop: bool = False
            tag_data_list: list[bytes] = []
            average_rssi_list: list[float] = []
            for frequency_index, frequency_value in enumerate(
                configuration_frequency_configuration_list, start=1
            ):
                if GPIO.input(BUTTON_RED_PIN) == GPIO.LOW:
                    stop = True
                    break

                elif stop:
                    break

                log(f"Frequency {frequency_index}: {frequency_value}MHz")
                LCD.text(f"Frequency {frequency_index}:", 1)
                LCD.text(f"{frequency_value}MHz", 2)
                time.sleep(0.5)

                response_frequency: Response | None = None
                try:
                    response_frequency = requests.post(
                        f"{SERVER_URL}/api/frequency",
                        json={"tagId": tag_id, "frequency": frequency_value},
                        timeout=5,
                    )

                except Exception as e:
                    log(f"Frequency Response: {e}")
                    LCD.text(f"Frequency {frequency_index}:", 1)
                    LCD.text("POST Fail", 2)
                    time.sleep(1)
                    break

                if (
                    (response_frequency is None)
                    or (response_frequency.json()["data"] is None)
                    or (response_frequency.json()["data"]["id"] is None)
                ):
                    log(f"Frequency Response: Invalid")
                    LCD.text(f"Frequency {frequency_index}:", 1)
                    LCD.text("POST Invalid", 2)
                    time.sleep(1)
                    break

                log(f"Frequency Response: {response_frequency.json()}")
                frequency_id: int = response_frequency.json()["data"]["id"]

                READER.set_reader_settings(
                    ReaderSettings(
                        address=0,
                        rfid_protocol=RfidProtocol.ISO_18000_6C,
                        work_mode=WorkMode.ACTIVE_MODE,
                        output_interface=OutputInterface.USB,
                        baud_rate=BaudRate.BPS_115200,
                        wiegand=Wiegand(
                            is_open=False,
                            byte_first_type=WiegandByteFirstType.LOW_BYTE_FIRST,
                            protocol=WiegandProtocol.WG_26,
                        ),
                        antenna=Antenna(
                            ant_1=True,
                            ant_2=False,
                            ant_3=False,
                            ant_4=False,
                            ant_5=False,
                            ant_6=False,
                            ant_7=False,
                            ant_8=False,
                        ),
                        frequency=Frequency(
                            region=REGION_MALAYSIA,
                            min_frequency=float(frequency_value),
                            max_frequency=float(frequency_value),
                        ),
                        power=30,
                        output_memory_bank=MemoryBank.EPC,
                        q_value=4,
                        session=Session.SESSION_0,
                        output_start_address=0,
                        output_length=12,
                        filter_time=0,
                        trigger_time=3,
                        buzzer_time=True,
                        inventory_interval=100,
                    )
                )

                response: Iterator[ResponseInventory] | None = READER.start_inventory(
                    work_mode=WorkMode.ANSWER_MODE,
                    answer_mode_inventory_parameter=(
                        AnswerModeInventoryParameter(
                            stop_after=StopAfter.NUMBER,
                            value=10,
                        )
                    ),
                )

                count: int = 1
                rssi_list: list[int] = []
                try:
                    for res in response:
                        if GPIO.input(BUTTON_RED_PIN) == GPIO.LOW:
                            stop = True
                            break

                        print()

                        if res is None:
                            continue

                        if res.status == InventoryStatus.SUCCESS and res.tag:
                            tag_data_list.append(res.tag.data)

                            rssi_value: int = int(
                                str(calculate_rssi(res.tag.rssi))[0:3]
                            )

                            log(
                                f"Frequency {frequency_index} RSSI {count}: {rssi_value}dBm"
                            )
                            LCD.text(f"RSSI {count}:", 1)
                            LCD.text(f"{rssi_value}dBm", 2)

                            response_rssi: Response | None = None
                            try:
                                response_rssi = requests.post(
                                    f"{SERVER_URL}/api/rssi",
                                    json={
                                        "frequencyId": frequency_id,
                                        "rssi": rssi_value,
                                    },
                                    timeout=5,
                                )

                            except Exception as e:
                                log(f"Response: {e}")
                                LCD.text(f"RSSI {count}:", 1)
                                LCD.text("POST Fail", 2)
                                time.sleep(1)
                                break

                            if (
                                (response_rssi is None)
                                or (response_rssi.json()["data"] is None)
                                or (response_rssi.json()["data"]["id"] is None)
                            ):
                                log(f"Invalid Response")
                                LCD.text(f"RSSI {count}:", 1)
                                LCD.text("POST Invalid", 2)
                                time.sleep(1)
                                break

                            log(f"POST Response: {response_rssi.json()}")

                            rssi_list.append(rssi_value)

                            count += 1
                            if count > configuration_rssi_scan_count:
                                break

                        if (
                            res.status == InventoryStatus.NO_COUNT_LABEL
                            and READER.work_mode == WorkMode.ANSWER_MODE
                        ):
                            break

                        time.sleep(configuration_rssi_scan_interval)

                except:
                    log(f"Frequency {frequency_index} RSSI {count}: Read Error")
                    LCD.text(f"RSSI {count}:", 1)
                    LCD.text("Read Error", 2)

                READER.stop_inventory()

                if not stop:
                    print()
                    log(f"Frequency {frequency_index}: {frequency_value}MHz")
                    for rssi_index, rssi_value in enumerate(rssi_list, start=1):
                        log(f"RSSI {rssi_index}: {rssi_value}dBm")

                    average_rssi: float = sum(rssi_list) / len(rssi_list)
                    average_rssi_list.append(average_rssi)

                    time.sleep(0.5)
                    log(f"Average RSSI: {average_rssi}dBm")
                    LCD.text("Average RSSI:", 1)
                    LCD.text(f"{average_rssi}dBm", 2)
                    time.sleep(1)
                    print()

            if not stop:
                response_tag: Response | None = None
                try:
                    response_tag = requests.put(
                        f"{SERVER_URL}/api/tag/id/{tag_id}",
                        json={
                            "tag": hex_readable(list(set(tag_data_list))[0]).replace(
                                " ", "-"
                            )
                        },
                        timeout=5,
                    )

                except Exception as e:
                    log(f"PUT Response: {e}")
                    LCD.text("RSSI Mode:", 1)
                    LCD.text("PUT Fail", 2)
                    time.sleep(1)
                    break

                if (response_tag is None) or (response_tag.json()["data"] is None):
                    log(f"PUT Response: Invalid")
                    LCD.text("RSSI Mode:", 1)
                    LCD.text("PUT Invalid", 2)
                    time.sleep(1)
                    break

                log(f"PUT Response: {response_tag.json()}")

                log("RSSI Summary Of All Frequencies")
                for average_rssi_index, average_rssi_value in enumerate(
                    average_rssi_list, start=1
                ):
                    log(
                        f"Frequency {average_rssi_index} ({configuration_frequency_configuration_list[average_rssi_index-1]}MHz) Average RSSI: {average_rssi_value}dBm"
                    )

                final_rssi: float = sum(average_rssi_list) / len(average_rssi_list)
                log(f"Final RSSI: {final_rssi}dBm")
                LCD.text("Final RSSI:", 1)
                LCD.text(f"{final_rssi}dBm", 2)
                print()

                log("Finished")
                print()

                while True:
                    if GPIO.input(BUTTON_RED_PIN) == GPIO.LOW:
                        break

                    time.sleep(0.5)

        time.sleep(0.5)


except KeyboardInterrupt:
    pass

except Exception as e:
    print(e)

finally:
    LCD.clear()
    GPIO.cleanup()
    READER.close()
