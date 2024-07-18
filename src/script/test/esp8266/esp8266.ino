#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClientSecure.h>

const int ledRedPin = 3;
const int ledYellowPin = 15;
const int ledGreenPin = 13;

const int buttonRedPin = 0;
const int buttonYellowPin = 4;
const int buttonGreenPin = 5;

const int updateDelay = 500;

int loopCounter = 0;

void setup()
{
	Serial.begin(115200);
	logSetup("Start");

	logSetup("Pins Setup");
	pinMode(buttonRedPin, INPUT_PULLUP);
	pinMode(buttonYellowPin, INPUT_PULLUP);
	pinMode(buttonGreenPin, INPUT_PULLUP);

	digitalWrite(buttonRedPin, HIGH);
	digitalWrite(buttonYellowPin, HIGH);
	digitalWrite(buttonGreenPin, HIGH);

	pinMode(ledRedPin, OUTPUT);
	pinMode(ledYellowPin, OUTPUT);
	pinMode(ledGreenPin, OUTPUT);

	logSetup("End");
};

void loop()
{
	update();

	logLoop("End of loop " + String(++loopCounter));
	delay(updateDelay);
};

void logSetup(String text)
{
	Serial.println("[setup] " + text);
};

void logLoop(String text)
{
	Serial.println("[loop] " + text);
};

void update()
{
	if (digitalRead(buttonRedPin) == LOW)
	{
		logLoop("Button Red Pressed");
		digitalWrite(ledRedPin, HIGH);
	}
	else
	{
		logLoop("Button Red Released");
		digitalWrite(ledRedPin, LOW);
	}

	if (digitalRead(buttonYellowPin) == LOW)
	{
		logLoop("Button Yellow Pressed");
		digitalWrite(ledYellowPin, HIGH);
	}
	else
	{
		logLoop("Button Yellow Released");
		digitalWrite(ledYellowPin, LOW);
	}

	if (digitalRead(buttonGreenPin) == LOW)
	{
		logLoop("Button Green Pressed");
		digitalWrite(ledGreenPin, HIGH);
	}
	else
	{
		logLoop("Button Green Released");
		digitalWrite(ledGreenPin, LOW);
	}
}