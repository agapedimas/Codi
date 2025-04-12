# Metode (Methods)

Metode adalah blok kode yang hanya dijalankan ketika dipanggil. Anda dapat mengirimkan data, yang dikenal sebagai *parameter*, ke dalam sebuah metode. Metode digunakan untuk melakukan tindakan tertentu, dan juga dikenal sebagai *fungsi*.  
Mengapa menggunakan metode? Untuk *mengulang penggunaan kode*: definisikan kode sekali, dan gunakan berkali-kali.

## Membuat Sebuah Metode

Metode harus dideklarasikan di dalam sebuah kelas. Ia didefinisikan dengan nama metode, diikuti oleh tanda kurung `()`. Java menyediakan beberapa metode bawaan, seperti `System.out.println()`, tetapi Anda juga dapat membuat metode sendiri untuk menjalankan tindakan tertentu:

```java filename=Main.java
public class Main {
    static void myMethod() {
        // kode yang akan dijalankan
    }
}
```

**Penjelasan:**
- `myMethod()` adalah nama dari metode tersebut  
- `static` berarti metode tersebut milik kelas `Main`, bukan objek dari kelas `Main`. Anda akan mempelajari lebih lanjut tentang objek dan bagaimana mengakses metode melalui objek di bagian lain dari tutorial ini.  
- `void` berarti metode ini tidak mengembalikan nilai. Anda akan mempelajari lebih lanjut tentang nilai balik (*return value*) pada bab ini.

## Memanggil Sebuah Metode

Untuk memanggil metode dalam Java, tuliskan nama metodenya diikuti oleh tanda kurung `()` dan titik koma `;`.

Dalam contoh berikut, `myMethod()` digunakan untuk mencetak teks (tindakan), ketika dipanggil:

```java filename=Main.java
// Di dalam main, panggil metode myMethod()
public class Main {
    static void myMethod() {
        System.out.println("Saya baru saja dijalankan!");
    }

    public static void main(String[] args) {
        myMethod();
    }
}
```

```txt filename=Output
Saya baru saja dijalankan!
```

Metode juga bisa dipanggil berkali-kali:

```java filename=Main.java
public class Main {
    static void myMethod() {
        System.out.println("Saya baru saja dijalankan!");
    }

    public static void main(String[] args) {
        myMethod();
        myMethod();
        myMethod();
    }
}
```

```txt filename=Output
Saya baru saja dijalankan!
Saya baru saja dijalankan!
Saya baru saja dijalankan!
```

# Parameter dan Argumen

Informasi dapat dikirim ke dalam metode sebagai parameter. Parameter berfungsi seperti variabel di dalam metode. Parameter ditentukan setelah nama metode, di dalam tanda kurung. Anda bisa menambahkan sebanyak mungkin parameter, cukup pisahkan dengan koma.

Contoh berikut memiliki metode yang menerima sebuah `String` bernama `fname` sebagai parameter. Ketika metode dipanggil, kita mengirimkan nama depan, yang digunakan dalam metode untuk mencetak nama lengkap:

```java filename=Main.java
public class Main {
    static void myMethod(String fname) {
        System.out.println(fname + " Refsnes");
    }

    public static void main(String[] args) {
        myMethod("Liam");
        myMethod("Jenny");
        myMethod("Anja");
    }
}
```

```txt filename=Output
Liam Refsnes
Jenny Refsnes
Anja Refsnes
```

Anda dapat memiliki sebanyak mungkin parameter yang diinginkan:

```java filename=Main.java
public class Main {
    static void myMethod(String fname, int age) {
        System.out.println(fname + " berumur " + age);
    }

    public static void main(String[] args) {
        myMethod("Liam", 5);
        myMethod("Jenny", 8);
        myMethod("Anja", 31);
    }
}
```

```txt filename=Output
Liam berumur 5
Jenny berumur 8
Anja berumur 31
```

# Nilai Kembali (*Return Values*)

Pada bagian sebelumnya, kita menggunakan kata kunci `void` dalam semua contoh, yang menunjukkan bahwa metode tersebut tidak mengembalikan nilai. Jika Anda ingin metode mengembalikan nilai, Anda dapat menggunakan tipe data primitif (seperti `int`, `char`, dan lain-lain) sebagai pengganti `void`, dan menggunakan kata kunci `return` di dalam metode:

```java filename=Main.java
public class Main {
    static int myMethod(int x) {
        return 5 + x;
    }

    public static void main(String[] args) {
        System.out.println(myMethod(3));
        // Output: 8 (5 + 3)
    }
}
```

```txt filename=Output
8
```

Contoh berikut mengembalikan hasil penjumlahan dari dua parameter dalam metode:

```java filename=Main.java
public class Main {
    static int myMethod(int x, int y) {
        return x + y;
    }

    public static void main(String[] args) {
        System.out.println(myMethod(5, 3));
    }
}
```

```txt filename=Output
8
```