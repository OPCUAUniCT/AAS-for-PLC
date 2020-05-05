PROGRAM mainProgram
  VAR RETAIN
    merker1 AT %MX0.0 : BOOL := true;
    merker2 AT %MX0.1 : BOOL := true;
    merker3 AT %MX0.2 : BOOL := true;
    merker4 AT %MX0.3 : BOOL := true;
    merker5 AT %MX0.4 : BOOL := true;
    merker6 AT %MX0.5 : BOOL := true;
    merker7 AT %MX0.6 : BOOL := true;
    merker8 AT %MX0.7 : BOOL := true;
    merker9 AT %MX1.0 : BOOL := true;
    merker10 AT %MX1.1 : BOOL := true;
    merker11 AT %MX1.2 : BOOL := true;
    merker12 AT %MX1.3 : BOOL := true;
    merker13 AT %MX1.4 : BOOL := true;
    merker14 AT %MX1.5 : BOOL := true;
    merker15 AT %MX1.6 : BOOL := true;
    merker16 AT %MX1.7 : BOOL := true;
    merker17 AT %MX2.0 : BOOL := true;
    merker18 AT %MX2.1 : BOOL := true;
    merker19 AT %MX2.2 : BOOL := true;
    merker20 AT %MX2.3 : BOOL := true;
    merker21 AT %MX2.4 : BOOL := true;
    merker22 AT %MX2.5 : BOOL := true;
    merker23 AT %MX2.6 : BOOL := true;
    merker24 AT %MX2.7 : BOOL := true;
    merker25 AT %MX3.0 : BOOL := true;
    merker26 AT %MX3.1 : BOOL := true;
    merker27 AT %MX3.2 : BOOL := true;
    merker28 AT %MX3.3 : BOOL := true;
    merker29 AT %MX3.4 : BOOL := true;
    merker30 AT %MX3.5 : BOOL := true;
    merker31 AT %MX3.6 : BOOL := true;
    merker32 AT %MX3.7 : BOOL := true;
    merker33 AT %MX4.0 : BOOL := true;
    merker34 AT %MX4.1 : BOOL := true;
    merker35 AT %MX4.2 : BOOL := true;
  END_VAR
  VAR NON_RETAIN
    output1 AT %QX100.0 : BOOL := false;
    output2 AT %QX100.1 : BOOL := false;
    output3 AT %QX100.2 : BOOL := false;
    output4 AT %QX100.3 : BOOL := false;
    output5 AT %QX100.4 : BOOL := false;
    output6 AT %QX100.5 : BOOL := false;
    output7 AT %QX100.6 : BOOL := false;
    output8 AT %QX100.7 : BOOL := false;
    output9 AT %QX101.0 : BOOL := false;
    output10 AT %QX101.1 : BOOL := false;
    output11 AT %QX101.2 : BOOL := false;
    output12 AT %QX101.3 : BOOL := false;
    output13 AT %QX101.4 : BOOL := false;
    output14 AT %QX101.5 : BOOL := false;
    output15 AT %QX101.6 : BOOL := false;
    output16 AT %QX101.7 : BOOL := false;
    output17 AT %QX102.0 : BOOL := false;
    output18 AT %QX102.1 : BOOL := false;
    output19 AT %QX102.2 : BOOL := false;
    output20 AT %QX102.3 : BOOL := false;
    output21 AT %QX102.4 : BOOL := false;
    output22 AT %QX102.5 : BOOL := false;
    output23 AT %QX102.6 : BOOL := false;
    output24 AT %QX102.7 : BOOL := false;
    output25 AT %QX103.0 : BOOL := false;
    output26 AT %QX103.1 : BOOL := false;
    output27 AT %QX103.2 : BOOL := false;
    output28 AT %QX103.3 : BOOL := false;
    output29 AT %QX103.4 : BOOL := false;
    output30 AT %QX103.5 : BOOL := false;
    output31 AT %QX103.6 : BOOL := false;
    output32 AT %QX103.7 : BOOL := false;
    output33 AT %QX104.0 : BOOL := false;
    output34 AT %QX104.1 : BOOL := false;
    output35 AT %QX104.2 : BOOL := false;
  END_VAR

  output1 := merker1;
  output2 := merker2;
  output3 := merker3;
  output4 := merker4;
  output5 := merker5;
  output6 := merker6;
  output7 := merker7;
  output8 := merker8;
  output9 := merker9;
  output10 := merker10;
  output11 := merker11;
  output12 := merker12;
  output13 := merker13;
  output14 := merker14;
  output15 := merker15;
  output16 := merker16;
  output17 := merker17;
  output18 := merker18;
  output19 := merker19;
  output20 := merker20;
  output21 := merker21;
  output22 := merker22;
  output23 := merker23;
  output24 := merker24;
  output25 := merker25;
  output26 := merker26;
  output27 := merker27;
  output28 := merker28;
  output29 := merker29;
  output30 := merker30;
  output31 := merker31;
  output32 := merker32;
  output33 := merker33;
  output34 := merker34;
  output35 := merker35;
END_PROGRAM


CONFIGURATION Config0

  RESOURCE Res0 ON PLC
    TASK task0(INTERVAL := T#20ms,PRIORITY := 0);
    PROGRAM instance0 WITH task0 : mainProgram;
  END_RESOURCE
END_CONFIGURATION
