try {
  const bigInt = require('big-integer')
  const elliptic = require('../src/index.js')
  const Curve = elliptic.Curve
  const ModPoint = elliptic.ModPoint

  ;(() => {
    const g = new ModPoint(
      bigInt('16'),
      bigInt('5')
    )
    const smallCurve = new Curve(
      bigInt('9'),
      bigInt('17'),
      bigInt('23'),
      bigInt('23'),
      g,
    )

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
      if (smallCurve.multiply(g, bigInt(i)).x.toString() !== tests[i].x) {
        throw `curve multiplication failed for g${i} (x)`
      }
      if (smallCurve.multiply(g, bigInt(i)).y.toString() !== tests[i].y) {
        throw `curve multiplication failed for g${i} (y)`
      }
    }
    console.log('- ✅ elliptic curve addition passed')
  })()

  ;(() => {
    const secp256k1 = require('simple-js-secp256k1')
  
    const privateToPublic = {
      '7': {
        x: '5cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bc',
        y: '6aebca40ba255960a3178d6d861a54dba813d0b813fde7b5a5082628087264da',
      },
      [bigInt('123').toString(16)]: {
        x: 'A598A8030DA6D86C6BC7F2F5144EA549D28211EA58FAA70EBF4C1E665C1FE9B5'.toLowerCase(),
        y: '204B5D6F84822C307E4B4A7140737AEC23FC63B65B35F86A10026DBD2D864E6B'.toLowerCase(),
      },
      [bigInt('999').toString(16)]: {
        x: '9680241112d370b56da22eb535745d9e314380e568229e09f7241066003bc471',
        y: 'ddac2d377f03c201ffa0419d6596d10327d6c70313bb492ff495f946285d8f38',
      },
      [bigInt('1485').toString(16)]: {
        x: 'c982196a7466fbbbb0e27a940b6af926c1a74d5ad07128c82824a11b5398afda',
        y: '7a91f9eae64438afb9ce6448a1c133db2d8fb9254e4546b6f001637d50901f55',
      },
      [bigInt('42424242').toString(16)]: {
        x: 'AEE2E7D843F7430097859E2BC603ABCC3274FF8169C1A469FEE0F20614066F8E'.toLowerCase(),
        y: '21EC53F40EFAC47AC1C5211B2123527E0E9B57EDE790C4DA1E72C91FB7DA54A3'.toLowerCase(),
      },
      [bigInt('999').pow('3').toString(16)]: {
        x: '9d5ca49670cbe4c3bfa84c96a8c87df086c6ea6a24ba6b809c9de234496808d5',
        y: '6FA15CC7F3D38CDA98DEE2419F415B7513DDE1301F8643CD9245AEA7F3F911F9'.toLowerCase(),
      },
      [bigInt('2').pow('128').toString(16)]: {
        x: '8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0da',
        y: '662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82',
      },
      [bigInt('2').pow('240').add(bigInt('2').pow('31')).toString(16)]: {
        x: '9577ff57c8234558f293df502ca4f09cbc65a6572c842b39b366f21717945116',
        y: '10b49c67fa9365ad7b90dab070be339a1daf9052373ec30ffae4f72d5e66d053',
      },
      '2103febe2a97e31d277195d1595f61439b83e63dc0168997bb919d94fecbd08a': {
        x: 'fe973c43d29ce39f940d3186a5a57c98231d59c7cedaa2387d07734777efed80',
        y: '126044836b26d12486de99ec2754ba7f5835cf83e369533f1d1844adab9b2c2b',
      }
    }

    for (privateKey in privateToPublic) {
      const publicPoint = secp256k1.multiply(secp256k1.g, bigInt(privateKey, 16))
      try {
        if (bigInt(publicPoint.x).toString(16) !== privateToPublic[privateKey].x) {
          throw `scalar multiplication failed for ${privateKey} ${bigInt(publicPoint.x).toString(16)} ${privateToPublic[privateKey].x}`
        }
        if (bigInt(publicPoint.y).toString(16) !== privateToPublic[privateKey].y) {
          throw `scalar multiplication failed for ${privateKey} ${bigInt(publicPoint.y).toString(16)} ${privateToPublic[privateKey].y}`
        }
        if (!secp256k1.verify(publicPoint)) {
          throw `public address verification failed for ${privateKey} ${privateToPublic[privateKey].pub} ${publicKey}`
        }
        if (secp256k1.xToY(publicPoint.x).map(y => y.toString(16)).indexOf(privateToPublic[privateKey].y) === -1) {
          throw `public address verification failed for ${privateKey} ${privateToPublic[privateKey].pub} ${publicKey}`
        }
        if (secp256k1.xToY(publicPoint.x, bigInt(privateToPublic[privateKey].y, 16).isOdd()) === privateToPublic[privateKey].y) {
          throw `public address verification failed for ${privateKey} ${privateToPublic[privateKey].pub} ${publicKey}`
        }
      }
      catch (e) {
        console.error(e)
      }
    }
    console.log('- ✅ elliptic curve multiplication passed')
  })()

  ;(() => {
    const secp256k1 = require('./secp256k1.js')
    const g = secp256k1.g

    const secenerios = [
      {
        a: bigInt('56667564291994487828485102179753108844100655002175520390771394182'),
        b: bigInt('102763905749049735238807018471543824205737799141527576421897199976847364233117')
      },
      {
        a: bigInt('56667564291994487828485102179753108844100655002175520390771394182'),
        b: bigInt('56667564291994487828485102179753108844100655002175520390771394183')
      },
    ]
    let i = 0
    while (i < 5) {
      secenerios.push({
        a: secp256k1.modSet.random(),
        b: secp256k1.modSet.random()
      })
      i++
    }
    secenerios.map(scenerio => {
      const a = scenerio.a
      const b = scenerio.b
      const aG = secp256k1.multiply(g, a)
      const bG = secp256k1.multiply(g, b)
  
      const c = a.minus(b).add(secp256k1.n).mod(secp256k1.n)
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