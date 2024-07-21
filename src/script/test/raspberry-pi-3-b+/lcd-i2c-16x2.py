import RPi.GPIO as GPIO
import time

from rpi_lcd import LCD as LCDRPi

LCD: LCDRPi = LCDRPi()

try:
    while(True):
        print("Test 1")
        LCD.text("Test 123", 1)
        LCD.text("Test 456", 2)
        time.sleep(0.5)

        print("Test 2")
        LCD.text("Test 456", 1)
        LCD.text("Test 123", 2) 
        time.sleep(0.5)

except KeyboardInterrupt:
    GPIO.cleanup()
