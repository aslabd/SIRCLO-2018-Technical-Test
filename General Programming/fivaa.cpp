#include<iostream>

using namespace std;
void fivaa(int x) {
    for (int i = x; i > 0; i--) {
        cout << i - 1 << i - 1;
        for (int j = i; j > 0; j--) {
            cout << i + 1;
        }
        cout << endl;
    }
}

int main() {
    fivaa(5);
    return 0;
}
