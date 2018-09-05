#include <iostream>

using namespace std;

int perkalian (int x, int y) {
    int hasil = 0;
    for (int i = 0; i < y; i++) {
        hasil = hasil + x;
    }

    return hasil;
}

int main() {
    int x, y;
    cin >> x >> y;
    cout << perkalian(x, y) << endl;
    return 0;
}
