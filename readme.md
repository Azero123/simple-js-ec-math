# simple-js-ec-math

this project is intended to make easier and faster crytography projects. it is intended to be very lightweight and thus will not have many dependencies

to create a new curve to do math on:
```
const g = new ModPoint(
    bigInt('16'),
    bigInt('5')
)
const curve = new Curve(
    bigInt('9'),
    bigInt('17'),
    bigInt('23'),
    bigInt('23'),
    g,
)
```

g is your starting point on the curve with g you can do abstract math instead of 1 + 2 you would add g + 2g as an example

adding two points:
```
curve.add(g, g)
```

subtracting two points:
```
curve.subtract(g, g)
```

multiplication:
```
curve.multiply(g, 100)
```

doubling:
```
curve.double(g)
```

note division is not possible in elliptic curves. this is knows as the "elliptic curve discrete logarithm problem" (ECDLP) and is useful for security practices because it creates 1 way mathematics that are insolvable

to verify a point is actually a viable solution to the curve the verify function has been provided.
```
const point = curve.multiply(g, 100)
curve.verify(point)
```

# contribute

bitcoin address: 1KKiniL7QnMPZZLjgGB2Kq1d7zsjUr6TnS 

ethereum address: 0x177b258bD53A8F7d8C609A9277A60A51d1e7e0e0