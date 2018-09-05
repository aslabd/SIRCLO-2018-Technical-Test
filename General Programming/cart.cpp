#include <iostream>
#include <map>

using namespace std;

class Cart {
private:
    map<string, int> item;

public:
    Cart(){}
    void tambahProduk(string kodeProduk, int kuantitas) {
        if (item.find(kodeProduk) != item.end())
            item[kodeProduk] = item[kodeProduk] + kuantitas;
        else
            item[kodeProduk] = kuantitas;
    }

    void hapusProduk(string kodeProduk) {
        if (item.find(kodeProduk) != item.end())
            item.erase(kodeProduk);
    }

    void tampilkanCart() {
        for (map<string,int>::iterator i = this->item.begin(); i != this->item.end(); ++i) {
            cout << i->first << " (" << i->second << ")" << endl;
        }
    }
};

int main() {
    Cart keranjang = Cart();

    // tambah produk
    keranjang.tambahProduk("Topi Putih", 2);
    keranjang.tambahProduk("Kemeja Hitam", 3);
    keranjang.tambahProduk("Sepatu Merah", 1);
    keranjang.tambahProduk("Sepatu Merah", 4);
    keranjang.tambahProduk("Sepatu Merah", 2);
    keranjang.tambahProduk("Celana Biru", 5);
    keranjang.tambahProduk("Celana Biru", 2);
    keranjang.tambahProduk("Topi Hitam", 3);

    // hapus produk
    keranjang.hapusProduk("Kemeja Hitam");
    keranjang.hapusProduk("Baju Hijau");
    keranjang.hapusProduk("Topi Hitam");

    keranjang.tampilkanCart();
    return 0;
}
