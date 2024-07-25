import RPi.GPIO as GPIO
import time


TRAFFIC_LIGHT_GREEN_PIN: int = 25
TRAFFIC_LIGHT_YELLOW_PIN: int = 8
TRAFFIC_LIGHT_RED_PIN: int = 7

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

GPIO.setup(TRAFFIC_LIGHT_GREEN_PIN, GPIO.OUT)
GPIO.setup(TRAFFIC_LIGHT_YELLOW_PIN, GPIO.OUT)
GPIO.setup(TRAFFIC_LIGHT_RED_PIN, GPIO.OUT)

try:
    while True:
        print("Traffic Light On")
        GPIO.output(TRAFFIC_LIGHT_GREEN_PIN, GPIO.HIGH)
        GPIO.output(TRAFFIC_LIGHT_YELLOW_PIN, GPIO.HIGH)
        GPIO.output(TRAFFIC_LIGHT_RED_PIN, GPIO.HIGH)
        time.sleep(0.5)

        print("Traffic Light Off")
        GPIO.output(TRAFFIC_LIGHT_GREEN_PIN, GPIO.LOW)
        GPIO.output(TRAFFIC_LIGHT_YELLOW_PIN, GPIO.LOW)
        GPIO.output(TRAFFIC_LIGHT_RED_PIN, GPIO.LOW)
        time.sleep(0.5)

except KeyboardInterrupt:
    GPIO.cleanup()
