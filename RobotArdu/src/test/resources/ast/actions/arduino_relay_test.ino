// This file is automatically generated by the Open Roberta Lab.

#include <Arduino.h>
#include <NEPODefs.h>


int _relay_R = 6;
void setup()
{
    pinMode(_relay_R, OUTPUT);
}

void loop()
{
    digitalWrite(_relay_R, LOW);
}