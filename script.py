import datetime
import time
from typing import Iterator
from rfid.reader import Reader
from rfid.response import ResponseInventory
from rfid.transport import Transport, SerialTransport
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
from rfid.utils import calculate_rssi


def log(message: str) -> None:
    print(f"[{datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] {message}")


log("Starting RFID reader...")
log(f"Ports: {SerialTransport.scan()}")

port: str = SerialTransport.scan()[0]
log(f"Port: {port}")

transport: SerialTransport = SerialTransport(
    serial_port=port, baud_rate=BaudRate.BPS_115200, timeout=1
)
log(f"Transport: {transport}")

reader: Reader = Reader(transport)
log("RFID reader started")

wiegand: Wiegand = Wiegand(
    is_open=False,
    byte_first_type=WiegandByteFirstType.LOW_BYTE_FIRST,
    protocol=WiegandProtocol.WG_26,
)

antenna: Antenna = Antenna(
    ant_1=True,
    ant_2=False,
    ant_3=False,
    ant_4=False,
    ant_5=False,
    ant_6=False,
    ant_7=False,
    ant_8=False,
)

frequency: Frequency = Frequency(
    region=REGION_MALAYSIA,
    min_frequency=920.00,
    max_frequency=925.00,
)

reader.set_reader_settings(
    ReaderSettings(
        address=0,
        rfid_protocol=RfidProtocol.ISO_18000_6C,
        work_mode=WorkMode.ACTIVE_MODE,
        output_interface=OutputInterface.USB,
        baud_rate=BaudRate.BPS_115200,
        wiegand=wiegand,
        antenna=antenna,
        frequency=frequency,
        power=30,  # max RC4 dbm
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

answer_mode_inventory_parameters: AnswerModeInventoryParameter = (
    AnswerModeInventoryParameter(
        stop_after=StopAfter.NUMBER,
        value=10,
    )
)

response: Iterator[ResponseInventory] | None = reader.start_inventory(
    work_mode=WorkMode.ANSWER_MODE,
    answer_mode_inventory_parameter=answer_mode_inventory_parameters,
)

while True:
    if (response is not None):
        break

    log("Waiting for response...")
    time.sleep(1)

index: int = 1
for res in response:
    log(f"({index}).InventoryThread() > run() > res: {res}")

    if res is None:
        continue

    if res.status == InventoryStatus.SUCCESS and res.tag:
        log(f"Tag: {res.tag} - RSSI:{str(calculate_rssi(res.tag.rssi))[0:3]}")

    if (
        res.status == InventoryStatus.NO_COUNT_LABEL
        and reader.work_mode == WorkMode.ANSWER_MODE
    ):
        break

    index += 1

reader.stop_inventory()
reader.close()
