# Struktur Data

## ArrayList

Kelas `ArrayList` adalah array yang dapat diubah ukurannya secara dinamis (*resizable array*), dan terdapat dalam paket `java.util`.

Perbedaan utama antara array bawaan (*built-in array*) dan `ArrayList` di Java adalah bahwa ukuran array tidak dapat diubah setelah dibuat (jika Anda ingin menambahkan atau menghapus elemen dari array, Anda harus membuat array baru). Sebaliknya, elemen dalam `ArrayList` dapat ditambahkan dan dihapus kapan saja. Sintaksnya juga sedikit berbeda:

```java
// Membuat objek ArrayList bernama cars yang akan menyimpan string:
import java.util.ArrayList; // impor kelas ArrayList

ArrayList<String> cars = new ArrayList<String>(); // Membuat objek ArrayList
```

### Menambahkan Item

Kelas `ArrayList` memiliki banyak metode yang berguna. Contohnya, untuk menambahkan elemen ke dalam daftar, gunakan metode `add()`:

```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> cars = new ArrayList<String>();
        cars.add("Volvo");
        cars.add("BMW");
        cars.add("Ford");
        cars.add("Mazda");
        System.out.println(cars);
    }
}
```

Anda juga bisa menambahkan item pada posisi tertentu dengan menyebutkan indeksnya:

```java
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> cars = new ArrayList<String>();
        cars.add("Volvo");
        cars.add("BMW");
        cars.add("Ford");

        cars.add(0, "Mazda"); // Menyisipkan elemen di awal daftar (indeks 0)

        System.out.println(cars);
    }
}
```

**Catatan:** Indeks array dimulai dari 0: `[0]` adalah elemen pertama, `[1]` adalah elemen kedua, dan seterusnya.

### Mengakses Item

Untuk mengakses elemen dalam `ArrayList`, gunakan metode `get()` dan sebutkan nomor indeks:

```java
cars.get(0);
```

### Mengubah Item

Untuk memodifikasi elemen, gunakan metode `set()` dan sebutkan nomor indeks:

```java
cars.set(0, "Opel");
```

### Menghapus Item

Untuk menghapus elemen, gunakan metode `remove()` dan sebutkan nomor indeks:

```java
cars.remove(0);
```

Untuk menghapus seluruh elemen dalam `ArrayList`, gunakan metode `clear()`:

```java
cars.clear();
```

### Ukuran ArrayList

Untuk mengetahui jumlah elemen dalam `ArrayList`, gunakan metode `size()`:

```java
cars.size();
```

### Melakukan Perulangan pada ArrayList

Gunakan perulangan `for` untuk menelusuri seluruh elemen dalam `ArrayList`, dan gunakan metode `size()` untuk menentukan berapa kali perulangan dilakukan:

```java filename=Main.java
public class Main {
    public static void main(String[] args) {
        ArrayList<String> cars = new ArrayList<String>();
        cars.add("Volvo");
        cars.add("BMW");
        cars.add("Ford");
        cars.add("Mazda");
        for (int i = 0; i < cars.size(); i++) {
            System.out.println(cars.get(i));
        }
    }
}
```

Anda juga dapat menggunakan perulangan **for-each** untuk menelusuri elemen dalam `ArrayList`:

```java filename=Main.java
public class Main {
    public static void main(String[] args) {
        ArrayList<String> cars = new ArrayList<String>();
        cars.add("Volvo");
        cars.add("BMW");
        cars.add("Ford");
        cars.add("Mazda");
        for (String i : cars) {
            System.out.println(i);
        }
    }
}
```

### Tipe Data Lain

Elemen dalam `ArrayList` sebenarnya adalah objek. Dalam contoh di atas, kita membuat elemen bertipe `String`. Perlu diingat bahwa di Java, `String` adalah sebuah objek (bukan tipe primitif). Untuk menggunakan tipe lain seperti `int`, Anda harus menggunakan kelas pembungkus (wrapper class) yang sesuai, misalnya `Integer`. Untuk tipe primitif lainnya, gunakan:
- `Boolean` untuk `boolean`
- `Character` untuk `char`
- `Double` untuk `double`
dan sebagainya.

```java filename=Main.java
// Membuat ArrayList untuk menyimpan angka (elemen bertipe Integer):
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<Integer> myNumbers = new ArrayList<Integer>();
        myNumbers.add(10);
        myNumbers.add(15);
        myNumbers.add(20);
        myNumbers.add(25);
        for (int i : myNumbers) {
            System.out.println(i);
        }
    }
}
```

### Mengurutkan ArrayList

Kelas lain yang berguna dalam paket `java.util` adalah `Collections`, yang memiliki metode `sort()` untuk mengurutkan daftar secara alfabetis atau numerik:

```java filename=Main.java
// Mengurutkan ArrayList bertipe String:
import java.util.ArrayList;
import java.util.Collections;  // Mengimpor kelas Collections

public class Main {
    public static void main(String[] args) {
        ArrayList<String> cars = new ArrayList<String>();
        cars.add("Volvo");
        cars.add("BMW");
        cars.add("Ford");
        cars.add("Mazda");
        Collections.sort(cars);  // Mengurutkan elemen dalam cars

        for (String i : cars) {
            System.out.println(i);
        }
    }
}
```