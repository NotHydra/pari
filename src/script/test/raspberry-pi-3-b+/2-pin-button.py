import RPi.GPIO as GPIO
import time


BUTTON_GREEN_PIN: int = 16
BUTTON_YELLOW_PIN: int = 20
BUTTON_RED_PIN:int = 21

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

GPIO.setup(BUTTON_GREEN_PIN, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(BUTTON_YELLOW_PIN, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(BUTTON_RED_PIN, GPIO.IN, pull_up_down=GPIO.PUD_UP)

try:
    count: int = 1
    while(True):
        if ((GPIO.input(BUTTON_GREEN_PIN) == GPIO.LOW and GPIO.input(BUTTON_YELLOW_PIN) == GPIO.LOW and GPIO.input(BUTTON_RED_PIN) == GPIO.LOW)):
            print("All Button Pressed")
            

        else:
            if (GPIO.input(BUTTON_GREEN_PIN) == GPIO.LOW):
                print("Button Green Pressed")

            else:
                print("Button Green Released")

            if (GPIO.input(BUTTON_YELLOW_PIN) == GPIO.LOW):
                print("Button Yellow Pressed")

            else:
                print("Button Yellow Released")

            if (GPIO.input(BUTTON_RED_PIN) == GPIO.LOW):
                print("Button Red Pressed")

            else:
                print("Button Red Released")

        print(f"End of Loop: {count}")
        print()

        count += 1

        time.sleep(0.5)
    
except KeyboardInterrupt:
    GPIO.cleanup()
   
