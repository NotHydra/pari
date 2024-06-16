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
from rfid.utils import calculate_rssi
from rpi_lcd import LCD as LCDRPi
from typing import Iterator

load_dotenv()


def log(message: str) -> None:
    print(f"[{datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] {message}")


URL: str = os.getenv("URL")

FREQUENCY_LIST: list[float] = [919.5, 920.0, 920.5, 921.0, 921.5, 922.0, 922.5]

GPIO.setmode(GPIO.BCM)

LCD: LCDRPi = LCDRPi()
BUTTON_PIN: int = 18
LED_GREEN_PIN: int = 23
LED_RED_PIN: int = 24

GPIO.setup(BUTTON_PIN, GPIO.IN)
GPIO.setup(LED_GREEN_PIN, GPIO.OUT)
GPIO.setup(LED_RED_PIN, GPIO.OUT)

log("Initializing Reader")
LCD.text("Reader:", 1)
LCD.text("Initializing", 2)
time.sleep(0.5)

PORTS: list[str] = SerialTransport.scan()
log(f"Ports: {PORTS}")

PORT: str = SerialTransport.scan()[0]
log(f"Port: {PORT}")

TRANSPORT: SerialTransport = SerialTransport(
    serial_port=PORT, baud_rate=BaudRate.BPS_115200, timeout=1
)
log(f"Transport: {TRANSPORT}")

READER: Reader = Reader(TRANSPORT)
log("Reader Initialized")
LCD.text("Reader:", 1)
LCD.text("Initialized", 2)

try:
    while True:
        if GPIO.input(BUTTON_PIN) == GPIO.HIGH:
            log("Starting")
            LCD.text("Reader:", 1)
            LCD.text("Starting", 2)
            time.sleep(0.5)

            GPIO.output(LED_GREEN_PIN, GPIO.HIGH)
            GPIO.output(LED_RED_PIN, GPIO.LOW)

            attempt_id: int = None
            try:
                response_attempt: Response = requests.post(f"{URL}/api/attempt", timeout=5)

                log(f"Response: {response_attempt.json()}")

                attempt_id = response_attempt.json()["data"]["id"]
            except Exception as e:
                log(f"Response: {e}")
                break

            if attempt_id is None:
                break

            average_rssi_list: list[float] = []
            for frequency_index, frequency_value in enumerate(FREQUENCY_LIST, start=1):
                log(f"Frequency {frequency_index}: {frequency_value}MHz")
                LCD.text(f"Frequency {frequency_index}:", 1)
                LCD.text(f"{frequency_value}MHz", 2)
                time.sleep(0.5)

                frequency_id: int = None
                try:
                    response_frequency = requests.post(
                        f"{URL}/api/frequency",
                        json={"attemptId": attempt_id, "frequency": str(frequency_value)},
                        timeout=5,
                    )

                    log(f"Response: {response_frequency.json()}")

                    frequency_id = response_frequency.json()["data"]["id"]
                except Exception as e:
                    log(f"Response: {e}")
                    break

                if frequency_id is None:
                    break

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
                            min_frequency=frequency_value,
                            max_frequency=frequency_value,
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
                        print()

                        if res is None:
                            continue

                        if res.status == InventoryStatus.SUCCESS and res.tag:
                            rssi_value: int = int(str(calculate_rssi(res.tag.rssi))[0:3])

                            log(
                                f"Frequency {frequency_index} RSSI {count}: {rssi_value}dBm"
                            )
                            LCD.text(f"RSSI {count}:", 1)
                            LCD.text(f"{rssi_value}dBm", 2)

                            rssi_id: int = None
                            try:
                                response_rssi = requests.post(
                                    f"{URL}/api/rssi",
                                    json={
                                        "frequencyId": frequency_id,
                                        "rssi": rssi_value,
                                    },
                                    timeout=5,
                                )

                                log(f"Response: {response_rssi.json()}")

                                rssi_id = response_rssi.json()["data"]["id"]
                            except Exception as e:
                                log(f"Response: {e}")
                                break

                            if rssi_id is None:
                                break

                            rssi_list.append(rssi_value)

                            count += 1
                            if count > 10:
                                break

                        if (
                            res.status == InventoryStatus.NO_COUNT_LABEL
                            and READER.work_mode == WorkMode.ANSWER_MODE
                        ):
                            break

                        time.sleep(0.1)

                except:
                    log(f"Frequency {frequency_index} RSSI {count}: Read Error")
                    LCD.text(f"RSSI {count}:", 1)
                    LCD.text("Read Error", 2)

                READER.stop_inventory()

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

            log("RSSI Summary Of All Frequencies")
            for average_rssi_index, average_rssi_value in enumerate(
                average_rssi_list, start=1
            ):
                log(
                    f"Frequency {average_rssi_index} ({FREQUENCY_LIST[average_rssi_index-1]}MHz) Average RSSI: {average_rssi_value}dBm"
                )

            final_rssi: float = sum(average_rssi_list) / len(average_rssi_list)
            log(f"Final RSSI: {final_rssi}dBm")
            LCD.text("Final RSSI:", 1)
            LCD.text(f"{final_rssi}dBm", 2)

            print()

            log("Finished")

            print()

        GPIO.output(LED_GREEN_PIN, GPIO.LOW)
        GPIO.output(LED_RED_PIN, GPIO.HIGH)

        time.sleep(0.5)


except KeyboardInterrupt:
    pass

finally:
    LCD.clear()
    GPIO.cleanup()
    READER.close()
