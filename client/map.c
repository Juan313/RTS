#include <stdio.h>

int main()
{

  int i = 0;
  for (; i<80; ++i){
    int j = 0;
    for (; j<60; ++j){
      if ( i== 0 || i == 1 || i == 78 || i == 79 || j ==0 || j == 59 || (i >= 4 && i <12 && j >=13 && j < 26))
        printf("[%d,%d],", i,j);
    }
  }

}