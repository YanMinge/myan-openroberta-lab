// This file is automatically generated by the Open Roberta Lab.

#include <Arduino.h>
#include <NEPODefs.h>


int _led_L = 13;
void setup()
{
    Serial.begin(9600); 
    pinMode(_led_L, OUTPUT);
}

void loop()
{
    Serial.println("Hallo");
}