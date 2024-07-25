import RPi.GPIO as GPIO
import time

BUZZER_PIN: int = 18

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

GPIO.setup(BUZZER_PIN, GPIO.OUT)

try:
    while True:
        print("Buzzer On")
        GPIO.output(BUZZER_PIN, GPIO.HIGH)
        time.sleep(2)

        print("Buzzer Off")
        GPIO.output(BUZZER_PIN, GPIO.LOW)
        time.sleep(2)

except KeyboardInterrupt:
    GPIO.cleanup()
