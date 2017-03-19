String readString;

void setup() {
  Serial.begin(9600);
  pinMode(10, INPUT);
}
 
void loop() {
  char incomingByte;
  while (Serial.available() > 0) {    
    delay(5);    
    incomingByte = Serial.read();
    readString +=incomingByte;
  }
  if ( readString == "dato") {

  Serial.println(analogRead(A0)); //lectura analógica
  delay(100);
  readString=""; 
  }
}
