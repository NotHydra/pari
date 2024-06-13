import datetime
import os
import requests
import RPi.GPIO as GPIO
import time

from dotenv import load_dotenv
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
from typing import Iterator

load_dotenv()


def log(message: str) -> None:
    print(f"[{datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] {message}")


URL: str = os.getenv("URL")

FREQUENCY: list[float] = [919.5, 920.0, 920.5, 921.0, 921.5, 922.0, 922.5]

GPIO.setmode(GPIO.BCM)

BUTTON_PIN: int = 18
LED_GREEN_PIN: int = 23
LED_RED_PIN: int = 24

GPIO.setup(BUTTON_PIN, GPIO.IN)
GPIO.setup(LED_GREEN_PIN, GPIO.OUT)
GPIO.setup(LED_RED_PIN, GPIO.OUT)

log("Initializing RFID Reader...")
log(f"Ports: {SerialTransport.scan()}")

PORT: str = SerialTransport.scan()[0]
log(f"Port: {PORT}")

TRANSPORT: SerialTransport = SerialTransport(
    serial_port=PORT, baud_rate=BaudRate.BPS_115200, timeout=1
)
log(f"Transport: {TRANSPORT}")

READER: Reader = Reader(TRANSPORT)
log("RFID Reader Initialized...")

try:
    while True:
        if GPIO.input(BUTTON_PIN) == GPIO.HIGH:
            log("Starting...")

            GPIO.output(LED_GREEN_PIN, GPIO.HIGH)
            GPIO.output(LED_RED_PIN, GPIO.LOW)

            for frequencyIndex, frequencyValue in enumerate(FREQUENCY, start=1):
                log(f"Frequency {frequencyIndex}: {frequencyValue}MHz")

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
                            min_frequency=frequencyValue,
                            max_frequency=frequencyValue,
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
                for res in response:
                    print()

                    # log(f"({count}).InventoryThread() > run() > res: {res}")

                    if res is None:
                        continue

                    if res.status == InventoryStatus.SUCCESS and res.tag:
                        # log(res)
                        # log(
                        #     f"Tag: {res.tag} - RSSI: {str(calculate_rssi(res.tag.rssi))[0:3]}"
                        # )
                        log(
                            f"Frequency {frequencyIndex} RSSI {count}: {int(str(calculate_rssi(res.tag.rssi))[0:3])}dBm"
                        )

                        count += 1
                        if count > 10:
                            break

                    if (
                        res.status == InventoryStatus.NO_COUNT_LABEL
                        and READER.work_mode == WorkMode.ANSWER_MODE
                    ):
                        break

                    time.sleep(0.25)

                READER.stop_inventory()
                print()

            log("Finished...")

        GPIO.output(LED_GREEN_PIN, GPIO.LOW)
        GPIO.output(LED_RED_PIN, GPIO.HIGH)

        time.sleep(1)


except KeyboardInterrupt:
    pass

finally:
    GPIO.cleanup()
    READER.close()
