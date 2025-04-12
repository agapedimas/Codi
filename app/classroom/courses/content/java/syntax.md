# Sintaks

Pada bab sebelumnya, kita telah membuat sebuah file Java bernama `Main.java`, dan menggunakan kode berikut untuk mencetak teks **"Hello World"** ke layar:

```java filename=Main.java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}
```

## Penjelasan Contoh

Setiap baris kode yang dijalankan dalam Java harus berada di dalam sebuah `class`. Nama kelas harus selalu diawali dengan huruf kapital. Dalam contoh di atas, kita memberi nama kelas dengan `Main`.

**Catatan:** Java bersifat *case-sensitive*, artinya penulisan huruf besar dan kecil memiliki makna yang berbeda. Misalnya `MyClass` dan `myclass` dianggap sebagai dua hal yang berbeda.

Nama file Java harus sesuai dengan nama kelas. Saat menyimpan file, simpanlah dengan nama kelas dan tambahkan ekstensi `.java`. Untuk menjalankan contoh di atas di komputer Anda, pastikan bahwa Java telah terinstal dengan benar: silakan merujuk ke bab *Get Started* untuk panduan instalasi. Output dari program tersebut adalah:

```txt filename=Output
Hello World
```

## Metode `main()`

Metode `main()` bersifat wajib dan akan selalu Anda temui pada setiap program Java:

```java
public static void main(String[] args)
```

Setiap kode yang ditulis di dalam metode `main()` akan dijalankan. Jangan khawatir dahulu mengenai kata kunci sebelum dan sesudahnya. Anda akan mempelajarinya secara bertahap selama mengikuti tutorial ini.

Untuk sekarang, cukup pahami bahwa setiap program Java harus memiliki:
- Nama `class` yang sesuai dengan nama file, dan
- Sebuah metode `main()` sebagai titik awal eksekusi program.

## Output

Di dalam metode `main()`, kita dapat menggunakan metode `println()` untuk mencetak satu baris teks ke layar:

```java
public static void main(String[] args) {
    System.out.println("Hello World");
}
```

```txt filename=Output
Hello World
```

## Komentar

Komentar digunakan untuk menjelaskan kode Java agar lebih mudah dibaca dan dipahami. Komentar juga dapat digunakan untuk menonaktifkan bagian kode ketika sedang melakukan pengujian.

### Komentar Satu Baris

Komentar satu baris diawali dengan dua garis miring `//`. Segala teks setelah `//` hingga akhir baris akan diabaikan oleh Java (tidak dieksekusi).

Contoh komentar satu baris sebelum kode:

```java
// Ini adalah komentar
System.out.println("Hello World");
```

Contoh komentar satu baris di akhir kode:

```java
System.out.println("Hello World"); // Ini juga komentar
```

### Komentar Multi-baris

Komentar multi-baris dimulai dengan `/*` dan diakhiri dengan `*/`. Segala teks di antara kedua tanda tersebut akan diabaikan oleh Java.

Contoh komentar multi-baris:

```java
/* Kode di bawah ini akan mencetak "Hello World"
ke layar, dan ini sangat menarik */
System.out.println("Hello World");
```

Penggunaan jenis komentar bergantung pada kebutuhan: gunakan `//` untuk komentar pendek dan `/* */` untuk komentar yang lebih panjang.

## Variabel

Variabel adalah tempat untuk menyimpan nilai data. Dalam Java, terdapat beberapa jenis variabel, antara lain:

- `String` – menyimpan teks, misalnya: "Hello". Nilai `String` ditulis dalam tanda kutip ganda.
- `int` – menyimpan bilangan bulat tanpa desimal, seperti 123 atau -123.
- `float` – menyimpan bilangan desimal, seperti 19.99 atau -19.99.
- `char` – menyimpan satu karakter, seperti 'a' atau 'B'. Nilai `char` ditulis dalam tanda kutip tunggal.
- `boolean` – menyimpan nilai `true` atau `false`.

### Mendeklarasikan (Membuat) Variabel

Untuk membuat variabel, tentukan *tipe data* dan berikan nilai awal:

```java
tipe namaVariabel = nilai;
```

Contoh menyimpan teks ke dalam variabel:

```java
// Membuat variabel bernama name dengan tipe String dan nilai "John"
String name = "John";
System.out.println(name);
```

```txt filename=Output
John
```

Contoh menyimpan angka:

```java
// Membuat variabel bernama myNum dengan tipe int dan nilai 15
int myNum = 15;
System.out.println(myNum);
```

```txt filename=Output
15
```

Jika Anda memberikan nilai baru ke variabel yang sudah ada, maka nilainya akan menimpa nilai sebelumnya:

```java
int myNum = 15;
myNum = 20;  // Sekarang nilainya menjadi 20
System.out.println(myNum);
```

```txt filename=Output
20
```

### Jenis Lain

Contoh mendeklarasikan berbagai tipe data:

```java
int myNum = 5;
float myFloatNum = 5.99f;
char myLetter = 'D';
boolean myBool = true;
String myText = "Hello";
```