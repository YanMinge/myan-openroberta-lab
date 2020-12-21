// This file is automatically generated by the Open Roberta Lab.
#define _ARDUINO_STL_NOT_NEEDED
#include "SenseBoxMCU.h"
#undef max
#undef min
#include <NEPODefs.h>
#include <Adafruit_NeoPixel.h>

unsigned int ___item;
unsigned int ___item2;
int _led_R2 = 8;
int _buzzer_B = 5;
Adafruit_NeoPixel _rgbled_R = Adafruit_NeoPixel(1, 1, NEO_RGB + NEO_KHZ800);
int _led_L = 4;
int _led_R1 = 7;

void setup()
{
    pinMode(_led_R2, OUTPUT);
    _rgbled_R.begin();
    pinMode(_led_L, OUTPUT);
    pinMode(_led_R1, OUTPUT);
    ___item = RGB(0xFF, 0xFF, 0xFF);
    ___item2 = RGB(120, 120, 120);
}

void loop()
{
    tone(_buzzer_B, 300);
    delay(100);
    noTone(_buzzer_B);
    digitalWrite(_led_R1, HIGH);
    digitalWrite(_led_R2, HIGH);
    digitalWrite(_led_L, HIGH);
    _rgbled_R.setPixelColor(0, _rgbled_R.Color(204, 0, 0));
    _rgbled_R.show();
    _rgbled_R.setPixelColor(0, _rgbled_R.Color(120, 120, 120));
    _rgbled_R.show();
    _rgbled_R.setPixelColor(0, _rgbled_R.Color(RCHANNEL(___item), GCHANNEL(___item), BCHANNEL(___item)));
    _rgbled_R.show();
    _rgbled_R.setPixelColor(0, _rgbled_R.Color(RCHANNEL(___item2), GCHANNEL(___item2), BCHANNEL(___item2)));
    _rgbled_R.show();
    _rgbled_R.setPixelColor(0, _rgbled_R.Color(0, 0, 0));
    _rgbled_R.show();
    _rgbled_R.setPixelColor(0, _rgbled_R.Color(0, 0, 0));
    _rgbled_R.show();
}