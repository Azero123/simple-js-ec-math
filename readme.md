# simple-js-ec-math

this project is intended to make easier and faster crytography projects. it is intended to be very lightweight and thus will not have many dependencies

to create a new curve to do math on:
```
const g = new ModPoint(16n, 5n)
const curve = new Curve(9n, 17n, 23n, 23n, g)
```

g is your starting point on the curve with g you can do abstract math instead of 1 + 2 you would add g + 2g as an example

## adding two points:
```
curve.add(<ModPoint>, <ModPoint>)
```

## subtracting two points:
```
curve.subtract(<ModPoint>, <ModPoint>)
```

## multiplication:
```
curve.multiply(<ModPoint>, <scalar>)
// e.g.
curve.multiply(g, 100n)
```

## doubling:
```
curve.double(g)
```

note division is not possible in elliptic curves. this is knows as the "elliptic curve discrete logarithm problem" (ECDLP) and is useful for security practices because it creates 1 way mathematics that are insolvable

## to verify point is curve:
```
const point = curve.multiply(g, 100n)
curve.verify(point)
```

## retrieving y coordinate from x coordinate:
```
curve.xToY(<x coordinate>, <is odd?>)

curve.xToY(0xfe973c43d29ce39f940d3186a5a57c98231d59c7cedaa2387d07734777efed80n) =>
126044836b26d12486de99ec2754ba7f5835cf83e369533f1d1844adab9b2c2b, ed9fbb7c94d92edb79216613d8ab4580a7ca307c1c96acc0e2e7bb515464d004

curve.xToY(0xfe973c43d29ce39f940d3186a5a57c98231d59c7cedaa2387d07734777efed80n, true) =>
126044836b26d12486de99ec2754ba7f5835cf83e369533f1d1844adab9b2c2b

curve.xToY(0x8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0dan, false) =>
662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82
```

# contribute

bitcoin address: 1KKiniL7QnMPZZLjgGB2Kq1d7zsjUr6TnS 

ethereum address: 0x177b258bD53A8F7d8C609A9277A60A51d1e7e0e0
