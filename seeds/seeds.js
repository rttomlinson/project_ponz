const models = require('../models/');
const User = models.User;
const Item = models.Item;

module.exports = () => {
  // ----------------------------------------
  // Create Users
  // ----------------------------------------
  console.log('Creating Users');
  var users = [];
  let user = new User({
    email: 'admin',
    password: 'admin',
    children: [],
    dogeCoins: 1000
  });
  users.push(user);

  // ----------------------------------------
  // Create Items
  // ----------------------------------------
  
  console.log('Creating Users');
  var items = [];
  items.push(
    new Item({
      price: 50,
      imgLocation: `data:image/png;base64,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`
    })
  );

  items.push(
    new Item({
      price: 75,
      imgLocation: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAElUlEQVRoQ+2YyW8bVRzHf8/7FnviOEmTpiREagpyKL20agViETQhbeJw7AWJE6KqhJAoIHFgu4AAIbgUJIT4A8qhUKnAoZVYeig0ipPabkuApkobO3bqOIn37cd745rEjmexmYwTKSP5YM3Mbz7f3/reI7DNL7LN+WFHQLMjuBOBRiKA82MWiJKX6bv9NIn7UktL8WwqOccdnXi9XnuqRwCvj41CQXOGgu9ZDxuemQGNThdx9fYfIY+c+1uuEFUF4NSQFbSmaSCkvxowG4/D4uwsGG3Wq67j0we3pgD/2IsAmm+E4BZu3oBCLg/OHnuf+bHJ23JEqBsB3/iHNHXeFAJbvPUPZBNJsHEtpxzD3jNbUcCPVMCwEBirg3wmA1x3x9eWDtcnMHD+T0KgKCZE3Qj4PbTzkC9qAbEayCQTYOFaQWswrD2C+Bm4jacJOVuo9Z66AgKje6GomaRFbK2EQcBCAYhWJ+Bs/Bkgf4K4L4SqH1BVAPs4Xht9BTTazytAEGlgJFAQXyKD33/VVAF4zdMJGqDeJPuAh2Y4sn14hbi/O9w0AXjD0w0FuMTDV7r//j9JIctUANcUARg41guop56H3vUAydgSLAeDNP+LYN/VCTZXu2DDwXxuRvPohQHVBYjBx+7creChUxja+h7cICKXTsFqOHyzbcT7kKoC5MPTerhfC1q9HiytHOhNJsil0/wvk4ijzeF4wn504jfVBMiHLyHprRZfPp0axAITs3YRLQGTveVL59DkSdXmQL3wJrvt07aRqdeiPwzuz2fxI0Q8wPcnQrw6A3nDOeKbFioOydIXrCqBG43C1/ud8vOKCqCtch8UyE+1uk11wTKAsucbheej9H9eXv8uD5+nQ4qQzupWuVnwigloFrwiApoJL0sA+oedgMZTNNkGAOkqkkCAZt63xH3O22x4SQHoGz0ERHOWAj9QVSspgOL7VNCraue87EEmtgEvGaEDhx+ga32ArW02s2DrGmToH3+PvvC2eJdaWwI0A140hdA3Lrp/LQWhtKZPxmKqe15ykKHPE6rO79rRQJj3+TfcUmJIyZlRgoMsdfnJSyaOe1oIulwGLALB6wG6pmfpVEopteBFUyh28eDHuVT6dOvunopTglw6CTq9oWIDHl+MwEpogddktNn+cB2fOiTHe0o8I7qUiJzfH8kmEy62RmdHHYVsll+rt3RUrBZ4jnuztyATT1BhBFt32/rNR7yzSgBK2RAVwFppdD58Jb2y6i4b6hzYS8UYN9hlxyLhv2b4o0Gz3X7ZOTL5uNTHlbgvazGX+OXhruyq7jmd1bTH1t7N2mvNazk4D4l7UTCYzaF2j69LCUApG7IElI2g/9guuncKChktz4ItK4CBi7XX1fAC3XxHWBe6SHdYz0p5T4n7dUWAF+D3vEtb5Tu1Ps5Ol+kJArb1dB0wHv5VcBuoBHjZRv0CkJ6tBcbZrqvCw+mVFVi6OwcWu+MDbmjiLSUhxWzVLeC/egiMPQ9F8gKd1k9hMReKzt1J642Gk45nrv6uFjz7TsMC1ITclAjsCFDIAzsppJAjGzaz7SPwL2Gl+UBjn60AAAAAAElFTkSuQmCC`
    })
  );
  items.push(
    new Item({
      price: 90,
      imgLocation: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADFklEQVRoQ+2ZTWgTQRTH36SbbpM2jdav0BKo6cGUYBUKRgS9SOqxiKIoXkXxUrzaggdbLx60F6EnD4qiINJjo54EMWKhpITGQ+MhVmJb1Jgm6WaTrDPbmiab7GaSbJYUZiFkyc6++f/eezvz3gbBLj/QLtcPugJ4R0aD2OJRTadIsBjwzw7p5Th9Ac6NSjTCAnOzus2rmyEi3KsC4DzikbmiX0PyNwMoCjOLQHHOsxSiWQEUY1gKsRSqI22Kb2EpxFKIpVCDHmAp1KAD2SrEUqiVUmgDLgURoEJLubC3U5Z3/HeyIFMCabELXrVmS5mEyyUtZSUAQtIJL3V79qgNSZKE3kWyd3HTfqP/3lNH75O5qsFXA6h0Y3TsPETHLsSwoMdnD3OTCCGq/poawB8Rp/DgO2TyU65rVcWTAbUAkPEfI89ku1j5/RGXeZxmEmqAtxExhg0eMgIAz/HT5zI79AYohPTEsevAJdJV7dcSAaFvP8x/eFSwiQGonEs1iFjFESgAeK5Mgj0Q1hUg7nVD6MUEA1D1arMj8Ms3DOGZ28ZEwDn9GpzTb3RNoe1ltHUANk0IwnarLMgdT0FHXntZbzmAVZ6DH1ZeBuhNCXBQyGpGzFCAHv8XcN/cWfIqKVvu4iFh5uRLNjELAxuCJkDo+TjETw4ak0L2T0vguTqlKogkS3CPFSS0tUojSYKhPynNPyNaCiDBmWDZZikBHMAbny2bV4U2FID/vgbDZ3aWPKWqFUs7rHWYS34+sClCXzqjCvB5YQay3VvlNzmauhOTCbQKuqVuCwhtphKxfC4Pg3/Vy4//hZxhALT1kOaTu31RWQcZEgHazYwGQLmEGgJAJsGNDezzzwO/sk6js2wM8fzqxdOkkSm71vRnoC7FNdzEAJTOKu7IanBkvUP178iKe+JiVaRGE3IAKdzvJEWADD7P5PDLE4V0sie3tyH8wW8l8BZh5RDgcglwzVd2NKUnJm8l3n/LTmDjt8QcONbTeUhgwfi8oYMA2XD32GOR4WISgoe+fu6B7m8lGlLZxJupe+ImamjI9D80pcFAbKyxcQAAAABJRU5ErkJggg==`
    })
  );
  items.push(
    new Item({
      price: 40,
      imgLocation: `data:image/png;base64,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`
    })
  );
  items.push(
    new Item({
      price: 60,
      imgLocation: `data:image/png;base64,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`
    })
  );

  // ----------------------------------------
  // Finish
  // ----------------------------------------
  console.log('Saving...');

  var promises = [];
  [users, items].forEach(collection => {
    collection.forEach(model => {
      promises.push(model.save());
    });
  });
  return Promise.all(promises);
};
