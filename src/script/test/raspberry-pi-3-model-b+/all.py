import RPi.GPIO as GPIO
import time

from rpi_lcd import LCD as LCDRPi

BUTTON_GREEN_PIN: int = 16
BUTTON_YELLOW_PIN: int = 20
BUTTON_RED_PIN: int = 21

TRAFFIC_LIGHT_GREEN_PIN: int = 25
TRAFFIC_LIGHT_YELLOW_PIN: int = 8
TRAFFIC_LIGHT_RED_PIN: int = 7

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

GPIO.setup(BUTTON_GREEN_PIN, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(BUTTON_YELLOW_PIN, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(BUTTON_RED_PIN, GPIO.IN, pull_up_down=GPIO.PUD_UP)

GPIO.setup(TRAFFIC_LIGHT_GREEN_PIN, GPIO.OUT)
GPIO.setup(TRAFFIC_LIGHT_YELLOW_PIN, GPIO.OUT)
GPIO.setup(TRAFFIC_LIGHT_RED_PIN, GPIO.OUT)

LCD: LCDRPi = LCDRPi()
LCD.text("Active Button:", 1)

try:
    count: int = 1
    while True:
        activeButton: list[str] = []

        if GPIO.input(BUTTON_RED_PIN) == GPIO.LOW:
            print("Button Red Pressed")
            GPIO.output(TRAFFIC_LIGHT_RED_PIN, GPIO.HIGH)
            activeButton.append("R")

        else:
            print("Button Red Released")
            GPIO.output(TRAFFIC_LIGHT_RED_PIN, GPIO.LOW)

        if GPIO.input(BUTTON_YELLOW_PIN) == GPIO.LOW:
            print("Button Yellow Pressed")
            GPIO.output(TRAFFIC_LIGHT_YELLOW_PIN, GPIO.HIGH)
            activeButton.append("Y")

        else:
            print("Button Yellow Released")
            GPIO.output(TRAFFIC_LIGHT_YELLOW_PIN, GPIO.LOW)

        if GPIO.input(BUTTON_GREEN_PIN) == GPIO.LOW:
            print("Button Green Pressed")
            GPIO.output(TRAFFIC_LIGHT_GREEN_PIN, GPIO.HIGH)
            activeButton.append("G")

        else:
            print("Button Green Released")
            GPIO.output(TRAFFIC_LIGHT_GREEN_PIN, GPIO.LOW)

        LCD.text(", ".join(activeButton), 2)

        print(f"End of Loop: {count}")
        print()

        count += 1

        time.sleep(0.1)

except KeyboardInterrupt:
    pass

finally:
    GPIO.cleanup()
