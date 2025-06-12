try {
  const elliptic = require('../src/index.js')
  const Curve = elliptic.Curve
  const ModPoint = elliptic.ModPoint

  ;(() => {
    const g = new ModPoint(16n, 5n)
    const smallCurve = new Curve(9n, 17n, 23n, 23n, g)

    const tests = [
      { x:'0', y:'0'},
      { x:'16', y:'5'},
      { x:'20', y:'20'},
      { x:'14', y:'14'},
      { x:'19', y:'20'},
      { x:'13', y:'10'},
      { x:'7', y:'3'},
      { x:'8', y:'7'},
      { x:'12', y:'17'},
      { x:'4', y:'5'},
    ]

    for (let i = 1; i < tests.length; i++) {
      if (smallCurve.multiply(g, BigInt(i)).x.toString() !== tests[i].x) {
        throw `curve multiplication failed for g${i} (x)`
      }
      if (smallCurve.multiply(g, BigInt(i)).y.toString() !== tests[i].y) {
        throw `curve multiplication failed for g${i} (y)`
      }
    }
    console.log('- ✅ elliptic curve addition passed')
  })()

  ;(() => {
    const secp256k1 = require('./secp256k1.js')
  
    const privateToPublic = [
      {
        p: 7n,
        x: 0x5cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bcn,
        y: 0x6aebca40ba255960a3178d6d861a54dba813d0b813fde7b5a5082628087264dan,
      },
      {
        p: 123n,
        x: 0xA598A8030DA6D86C6BC7F2F5144EA549D28211EA58FAA70EBF4C1E665C1FE9B5n,
        y: 0x204B5D6F84822C307E4B4A7140737AEC23FC63B65B35F86A10026DBD2D864E6Bn,
      },
      {
        p: 999n,
        x: 0x9680241112d370b56da22eb535745d9e314380e568229e09f7241066003bc471n,
        y: 0xddac2d377f03c201ffa0419d6596d10327d6c70313bb492ff495f946285d8f38n,
      },
      {
        p: 1485n,
        x: 0xc982196a7466fbbbb0e27a940b6af926c1a74d5ad07128c82824a11b5398afdan,
        y: 0x7a91f9eae64438afb9ce6448a1c133db2d8fb9254e4546b6f001637d50901f55n,
      },
      {
        p: 42424242n,
        x: 0xAEE2E7D843F7430097859E2BC603ABCC3274FF8169C1A469FEE0F20614066F8En,
        y: 0x21EC53F40EFAC47AC1C5211B2123527E0E9B57EDE790C4DA1E72C91FB7DA54A3n,
      },
      {
        p: 999n ** 3n,
        x: 0x9d5ca49670cbe4c3bfa84c96a8c87df086c6ea6a24ba6b809c9de234496808d5n,
        y: 0x6FA15CC7F3D38CDA98DEE2419F415B7513DDE1301F8643CD9245AEA7F3F911F9n,
      },
      {
        p: 2n ** 128n,
        x: 0x8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0dan,
        y: 0x662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82n,
      },
      {
        p: 2n ** 240n + 2n ** 31n,
        x: 0x9577ff57c8234558f293df502ca4f09cbc65a6572c842b39b366f21717945116n,
        y: 0x10b49c67fa9365ad7b90dab070be339a1daf9052373ec30ffae4f72d5e66d053n,
      },
      {
        p: 0x2103febe2a97e31d277195d1595f61439b83e63dc0168997bb919d94fecbd08an,
        x: 0xfe973c43d29ce39f940d3186a5a57c98231d59c7cedaa2387d07734777efed80n,
        y: 0x126044836b26d12486de99ec2754ba7f5835cf83e369533f1d1844adab9b2c2bn,
      }
    ]

    for (const scenerio of privateToPublic) {
      const privateKey = scenerio.p
      const publicPoint = secp256k1.multiply(secp256k1.g, privateKey)
      if (publicPoint.x !== scenerio.x) {
        throw `scalar multiplication failed for ${privateKey} (x) ${publicPoint.x.toString(16)} ${scenerio.x}`
      }
      if (publicPoint.y !== scenerio.y) {
        throw `scalar multiplication failed for ${privateKey} (y) ${publicPoint.y.toString(16)} ${scenerio.y}`
      }
      if (!secp256k1.verify(publicPoint)) {
        throw `public address verification failed for ${privateKey} ${publicPoint}`
      }
      if (secp256k1.xToY(publicPoint.x).indexOf(scenerio.y) === -1) {
        throw `public address verification failed for ${privateKey} ${publicPoint}`
      }
    }
    console.log('- ✅ elliptic curve multiplication passed')
  })()

  ;(() => {
    const secp256k1 = require('./secp256k1.js')
    const g = secp256k1.g

    const secenerios = [
      {
        a: 56667564291994487828485102179753108844100655002175520390771394182n,
        b: 102763905749049735238807018471543824205737799141527576421897199976847364233117n
      },
      {
        a: 56667564291994487828485102179753108844100655002175520390771394182n,
        b: 56667564291994487828485102179753108844100655002175520390771394183n
      },
    ]
    let i = 0
    while (i < 5) {
      secenerios.push({
        a: BigInt(secp256k1.modSet.random()),
        b: BigInt(secp256k1.modSet.random())
      })
      i++
    }
    secenerios.map(scenerio => {
      const a = scenerio.a
      const b = scenerio.b
      const aG = secp256k1.multiply(g, a)
      const bG = secp256k1.multiply(g, b)
  
      const c = (a - b + secp256k1.n) % secp256k1.n
      const cG = secp256k1.subtract(aG, bG)

      if (secp256k1.multiply(g, c).toString() !== cG.toString()) {
        throw 'subtract failed'
      }
    })
    console.log('- ✅ elliptic curve subtraction passed')
  })()
  console.log('✅ elliptic math tests passed')
}
catch (error) {
  console.log('⚠️ failed to test elliptic math', error)
  throw error
} 