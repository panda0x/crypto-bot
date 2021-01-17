require('dotenv').config();
const TeleBot = require('telebot');
const Binance = require('node-binance-api');
const CoinMarketCap = require('coinmarketcap-api');
const bip39 = require('bip39')
const mnemonic = bip39.entropyToMnemonic('00000000000000000000000000000000')



const bot = new TeleBot(process.env.TELEGRAM_TOKEN);
const binance = new Binance({
  APIKEY: process.env.BINANCE_KEY,
  APISECRET: process.env.BINANCE_SECRET,
});


const TOO_MUCH = 'yavaş lan botun anasını siktiniz!';
const NO_CURRENCY = 'No currency found with that name.';
const NO_TICKER = 'Ticker not found.';
const RANK_NOT_IN_RANGE = 'Given rank must be greater than 1.';
const NO_CURRENCY_RANK = 'No currency found with that rank.';
const DEPRECATED = 'Deprecated';

let cache = { global: {}, bin: {} };

bot.on('/start', (msg) => {
  msg.reply.text(
    'fiyat çekme komutları /btc ve /eth\ndonate için /d \nbotu random sövdürmek için /k'
  );
});
 
bot.on('/help', (msg) => {
  msg.reply.text(
    'fiyat çekme komutları /btc ve /eth\ndonate için /d \nbotu sövdürmek için /k'
  );
}); 




bot.on('/donate', (msg) => {
  msg.reply.text(
    'amına koydumun pintileri siz bağışmı atarsınız lan.\n'

  ); 
});

bot.on('/helva', (msg) => {
  msg.reply.text(
    'https://panda0x.com/helva.jpg\n'

  ); 
});


bot.on('/ck', (msg) => {
  msg.reply.text(
    'https://panda0x.com/ç.jpg\n'

  ); 
});


bot.on('/magara', (msg) => {
  msg.reply.text(
    'https://panda0x.com/magara.jpg\n'

  ); 
});

bot.on('/kahve', (msg) => {
  msg.reply.text(
    'https://panda0x.com/k.jpg\n'

  ); 
});


bot.on('/ds', (msg) => {
  msg.reply.text(
    'https://panda0x.com/ds.jpg\n'

  ); 
});


bot.on('/hosaf', (msg) => {
  msg.reply.text(
    'https://panda0x.com/hosaf.jpg\n'

  ); 
});

bot.on('/zararpanda', (msg) => {
  msg.reply.text(
    '0xF361D48454A50ADd88A12046B46e0e6f5b110650\n'

  ); 
});

bot.on('/milyonahmet', (msg) => {
  msg.reply.text(
    '0x4df24E287BBDee5B4649a476F72b72b29b535880\n'

  ); 
});

bot.on('/zararbatu', (msg) => {
  msg.reply.text(
    '0x542486eDA89781d536ccbedE23a944558a857407\n'

  ); 
});

bot.on('/zarartwn', (msg) => {
  msg.reply.text(
    '0xc656f0f118EB5cA7e82a4F8109a4e3B7227A9Cc2\n'

  ); 
});




bot.on('/n', (msg) => {
  msg.reply.text(
    'https://panda0x.com/nah.jpg\n'

  ); 
});

bot.on('/bountyold', (msg) => {
  msg.reply.text(
    'panda-0xd67bF81C88FEA82A74dDB9b4408eBc604512aAcd\ntwn-0xc656f0f118EB5cA7e82a4F8109a4e3B7227A9Cc2\nahmet-0x4df24E287BBDee5B4649a476F72b72b29b535880\nbatu-0x542486eDA89781d536ccbedE23a944558a857407\n\nne verirsen elin ile o gelir senin ile \nbismillahirrahmanirrahim',


  ); 
});



bot.on('/seed', (msg) => {
  msg.reply.text(bip39.generateMnemonic());
});


bot.on('/gold', (msg) => {
  msg.reply.text(kdoviz.altin().then(console.log).catch(console.error)
);
});



bot.on('/gold', (msg) => {
  msg.reply.text(kdoviz.altin().then(console.log).catch(console.error)
);
});


bot.on('/edg', (msg) => {
  msg.reply.text(
    'EDG/USDT -0,00\nsatmadınızmı hala a.q\n'
  );
});

bot.on('/gup', (msg) => {
  msg.reply.text(
    'GUP/USDT -0,00\ngözümde canlanır koskoca mazi gine kim sikti bizi niyazi\n'
  );
});

bot.on('/kk', (msg) => {
  msg.reply.text(random());
});

bot.on('/maymun', (msg) => {
  msg.reply.text(maymun());
});



bot.on('/5', (msg) => {
  msg.reply.text(random());
});

// Ticker information from CoinMarketCap
bot.on(/^\/info (.+)$/i, async (msg, props) => {
  updateCalls(msg);
  const text = props.match[1].substring(5);
  // Checks if the same argument has been passed into the command in the last 5 minutes
  if (cache[text] && isValidCache(cache[text], cache[text].last_updated)) {
    return msg.reply.text(formatInfo(cache[text]), { asReply: false});
  } else {
    if (isNaN(text)) {
      const symbol = text.toUpperCase();
      cmcClient.getQuotes({ symbol: symbol }).then((info) => {
        console.log(info);
        if (!('data' in info && symbol in info.data))
          return msg.reply.text(NO_CURRENCY, { asReply: false});
        const data = info.data[symbol];
        cache[symbol] = data;
        return msg.reply.text(formatInfo(data), { asReply: false});
      });
    } else {
      const rank = parseInt(text);
      if (rank === 0) return msg.reply.text(RANK_NOT_IN_RANGE, { asReply: false});
      cmcClient.getTickers({ start: rank, limit: 1 }).then((info) => {
        console.log(info);
        if (info.data.length === 0) return msg.reply.text(NO_CURRENCY_RANK, { asReply: false});
        const data = info.data[0];
        cache[text] = data;
        return msg.reply.text(formatInfo(data), { asReply: false});
      });
    }
  }
});

// Total market information from CoinMarketCap
bot.on('/global', async (msg) => {
  updateCalls(msg);
  // Checks if global command has been called in last 5 minutes
  if (isValidCache(cache.global, cache.global.last_updated)) {
    return msg.reply.text(formatGlobalInfo(cache.global), { asReply: false});
  }
  cmcClient.getGlobal().then((info) => {
    console.log(info);
    cache.global = info.data;
    return msg.reply.text(formatGlobalInfo(info.data), { asReply: false});
  });
});

// Latest exchange price from Binance
bot.on(/^\/(.+)$/i, async (msg, props) => {
  const text = props.match[1].toLowerCase();
  if (isValidTickerText(props, text)) {
    updateCalls(msg);
    // Checks if command has been called in the past 5 minutes
    if (isValidCache(cache.bin.data, cache.bin.last_updated)) {
      return msg.reply.text(formatBinanceInfo(cache.bin.data, text.toUpperCase()), {
        asReply: false,
      });
    } else {
      binance.prices((_, ticker) => {
        cache.bin.last_updated = new Date();
        cache.bin.data = ticker;
        console.log('Called Binance API');
        return msg.reply.text(formatBinanceInfo(ticker, text.toUpperCase()), { asReply: false});
      });
    }
  }
});



bot.on(/^([Hh]ey|[Hh]oi|[Hh]a*i)$/, function (msg) {
return bot.sendMessage(msg.from.id, 'Hello Commander');
});



///////// Formats the output for Binance exchange price
function formatBinanceInfo(ticker, text) {
  // The keys in the ticker object are exchanges in format equivalent to VENETH
  const turkishlira = [,'USDT','BUSD','TRY'];
  
  let output = '';
  turkishlira.forEach((item) => {

  const exc = text + item;
    // Checks if there exists an exchange in the ticker with each of the pairs
    if (ticker[exc]) {
      output += exc.replace(text, text + '/') +' ' + formatNum(ticker[exc]) + ' ' +'\n';

    }
  });

 
  
  return output == '/xx' ? NO_TICKER : output;
}







// Check if valid ticker given for /<ticker>
function isValidTickerText(props, text) {
  return (
    !text.startsWith('global') &&
    !text.startsWith('info') &&
    !props.match[0].startsWith('/chart') &&
    text.match(/^[a-zA-Z]+$/) &&
    text.length < 6
  );
}

// Check if the cache is valid
function isValidCache(data, lastUpdated) {
  return data && Math.floor(((new Date() - lastUpdated) / 60) % 60) < 5;
}

// Formats number string
function formatNum(str) {
  return parseFloat(str).toLocaleString();
}

// Formats the displayed estimated dollar price for Binance exchange values
function formatBin(price1, price2) {
  return (parseFloat(price1) * parseFloat(price2)).toLocaleString();
}

// Checks for more than 30 calls a minute and updates number of calls
function updateCalls(msg) {
  if (calls > 10) {
    return msg.reply.text(TOO_MUCH, { asReply: false});
  }
  calls++;
}

let calls = 0;
resetNumCalls();
setInterval(resetNumCalls, 10000);
function resetNumCalls() {
  console.log('Resetting number of calls at ' + new Date().toString());
  calls = 0;
}



var list2 = ['nefesssiz sikiyolar', 
'bikerede çık a.q', 
'düş düş a.q çok çıktın hemen düş.', 
'linkin a.q',
'btc 31 Ocak 2022den önce 100 bin dolar olacak. kaç oldu lan?',
'reis çok yaşa', 
'ahmet derdini sikeyim', 
'panda her zaman haklıdır itiraz edenin a.q', 
'batu napıyon lan',
'ico yokmu ico a.q açız lan',
'küfür verin lan bota ekleyelim', 
'gençliğimi yedin aq', 
'ortamlarda blockchain teknoloji dersin panpa kim anlayacak', 
'bu piyasa girdiğim güne lanet olsun', 
'maldan çıkana sövüyoruz', 
'sikerim teknolojisini fiyata bak yaprak is coming', 
'btc 20k olacak yarraaak olacak\nedit:oldu içinden bile geçti a.q', 
'torikan bnb ieolardan kazandığı paralarla kübada pro fabrikası satın almış diyorlar', 
'edge batuya plaket göndermiş', 
'bancorun a.q stabil coinler bu kadar stabilite görmedi', 
'hayat Etherlerini 800 dolardan satan Ahmete güzel aq', 
'panda altlardan öyle bir para kazanmışki aklayabilmek için mali müşavir olmuş diyorlar :D', 
'twn 4 dolardan aldığı etherler sayesinde çalıştığı oteli üzerine almış', 
'Batu berduşt olmuş, üzerinde EDGE yazan bir huni ile keçiören de dolaşıyormuş', 
'ahmet teknolojine yine söverim', 
'olm çıkıcak bekleyin dediğiniz bugün torunum oldu hala bekliyoruz', 
'çıkacak diyene ağır söverim ona göre', 
'bu a.q bnbsini aldğım güne nalet olsun',
'bnb alma fikrini ortaya kim attı lan ortaya çıksın söz silkmeyecem,',
'yeni küfür öğretin olm',
'YTD amk, özellikle YTD. Bu saatten sonra bir donum kaldı haciz için',
'torikan yine kayıp ico kovalıyodur a.q',
'ozgr yine kayıp balkondan karı kız kesiyodur a.q',
'goraset yine kayıp forumdan çıkmıyodur a.q',
'panda yine kayıp defi kovalıyodur a.q',
'olm bancor dediniz, Yahudi dediniz, kaybetmez dediniz içimizde gezdirdiler',
'batu edge tutandan vergi kesiyorlarmış, petrol gibi eksi faiz olmuş alana para veriyorlarmış aq',
'sizin yüzünüzden küfürbaz oldum aq kriptocuları',
'olm Ahmet yine kimi soktun piyasaya, bırak olm bak bizim donumuza kadar aldılar yazık adamlara',
'Ne fiyatı çekiyorsunuz aq, yine düşüyor işte',
'Update yapıyorum aq, sonra gelin',
'Fiyat falan bakamam şimdi, keyfim yok',
'Olm bu sefer çıkıyor lan galiba',
'Panil yok, birazdan verirler elimize',
'Twn 2 bira ısmarla da keyfimiz yerine gelsin, hesabı ahmete yaz',
'Lan bedavaya çalıştırıyorsunuz, yoruldum',
'Ahmet yine ne yazıyon lan, okumaz olm bu ülkenin insanı',
'Akvaroşlardan emir almam',
'CeHaPe zihniyeti aq, hepiniz aynısınız',
'Nabıyonuz lan gene batık kriptocular',
'Olm bu kadar komut çekerseniz server ekstra para isteyecek benden söylemesi',
'karı yok mu lan yeni',
'Batunun yeni kitabı: 90 bitcoin nasıl piç edilir. Tüm kitapçılarda',
'Yine malda kaldık',
'ulan panda kek dedin börek dedin 2 kilo altın indirdin defiden',
'yeni trend kıymalı poğaça ve vişne suyu defisi',
'panda qnb first olmuş artık proletarya ile muhattap olmam diyormuş',
'twn otelde müdürün önünde kabak çekirdeği çitleyip çöplerini yüzüne atıyormuş yinede kovduramamış kendini',
'ulan trilyon götürdünüz şu işten hala adam gibi bir server alamadınız bana',
'panda insanları genel olarak ikiye ayırıyormuş first olanlar ve diğerleri',
'bi tane kadın bot ekleyin gruba da keyfimiz yerine gelsin ',
'ezan okunuyo sövmeyin a.q',
'ilim irfanınızının a.q küfür list yapıyolar',
'olm küfürbaz bot mu olur aq adam gibi işlerle niye uğraşmıyorsunuz',
'kitap söyleyin aq canım sıkıldı okuyayım biraz. panda yaratıcı küfürler kitabı hangi yayınevindeydi',
'8.5mb küfür list yapmış aq işsizleri',
'olm küfürbaz bot mu olur aq adam gibi işlerle niye uğraşmıyorsunuz',
'kitap söyleyin aq canım sıkıldı okuyayım biraz. panda yaratıcı küfürler kitabı hangi yayınevindeydi',
'ayda 2 dolar veriyorsunuz diye bokunu çıkarıyorsunuz. serverin anası sikildi komut çekmekten. banlarlarsa bana yeni server alırsınız ona göre',
'ahmet bizi de götür lan amerikaya. oradaki botlar para bile kazanıyormuş. burda bedavaya çalışıyoruz aq',
'küfretmeyin yeter aq',
'bismillahirrahmanirrahim',

'hocam maşallah soyu tükenmiş boz başlı cazgır keşiş damızlık davar aygırı gibisiniz herkese bol şans :D',
'netflixin yeni dizisini gördünüz mü lan çok güzel. 7 karı aynı anda bu sefer',
'trump seçilecek olm görürsünüz',
'btc 13k olunca ahmetin bounty sözü var unutturmayın',
'sikerim komutunuzu yeter aq arada rahat bırakın dinleneyim',
'olm beni parayla satın lan',
'hangi beyinsiz hala ripple uçacak diyor. gel yavrum gel otur şöyle bi soluklan önce ',
'karıya gidek mi ya? piyasada durgun zaten bişi olduğu yok değişiklik olur. panda senin 4 çocuklu eskortun numarasını versene ya. karnında ameliyat izi olan değil yüzünde faça olan karının.',
'yine anasını sikmişler piyasanın',
'abd anasının amını görecek yakındır',
'çok kötü alıştırdınız beni lan küfür etmeden konuşamıyorum artık aq',
'bi küfür etmeyin lütfen aq',
'ya bi siktirin gidin. koca koca adamlar bota küfür ettiriyorlar aq',
'ne zaman asyaya gidicez lan karılar ucuzmuş orda',
'türk lirası origami piyasasına girmiş aq',
'hani dolar 10 lira olacaktı lan hain fetöcüler',
'karabaq 82',
'bu kod yazıldığında btc 11400 dü şimdi kim bilir kaç olmuştur a.q evi arabayı satıp basacaktık',
'https://panda0x.com/nah.jpg\n',
'/btc',
'bu kod yazıldığında ahmet milyonerdi geri kalanımız her zaman ki gibi batık a.q ve btc 19100 eth 600 dolardı a.q xrpside 0,6 cent tarih 07.12.2020  ',
'pandanın yüzü gülürmü a.q',
'panda skaledende battın demi lan',
'korona hala bitmedimi a.q 08.12.2020',



];



var myArray = ['anasını sikeyim bu piyasanın', 
'nefesssiz sikiyolar', 
'bikerede çık a.q', 
'düş düş a.q çok çıktın hemen düş.', 
'linkin a.q',
'reis çok yaşa', 
'ahmet derdini sikeyim', 
'panda her zaman haklıdır itiraz edenin a.q', 
'batu napıyon lan',
'küfür verin lan bota ekleyelim', 
'gençliğimi yedin aq', 
'ortamlarda blockchain teknoloji dersin panpa kim anlayacak', 
'bu piyasa girdiğim güne lanet olsun', 
'maldan çıkana sövüyoruz', 
'ahmet bırak teknolojiyi fiyata bak', 
'btc 20k olacak yarraaak olacak', 
'panda liskden kazandığı paraları pavyonda yemiş diyorlar', 
'edge batuya plaket göndermiş', 
'bancorun ekmeğini de Tuna ile Ahmet yedi', 
'bancorun a.q stabil coinler bu kadar stabilite görmedi', 
'twn 4 dolardan Ether alamazsın demedik adam olamazsın dedik', 
'hayat Etherlerini 800 dolardan satan Ahmete güzel aq', 
'Ahmetin Bali de etherleri karılarla ezerken görüntüleri düşmüş internete', 
'panda altlardan öyle bir para kazanmışki aklayabilmek için mali müşavir olmuş diyorlar\nevet yarrak müşaviri oldum', 
'Tuna 4 dolardan aldığı etherler sayesinde çalıştığı oteli üzerine almış', 
'Batu berduşt olmuş, üzerinde EDGE yazan bir huni ile keçiören de dolaşıyormuş', 
'ahmet başlatma teknolojine yine söverim', 
'olm çıkıcak bekleyin dediğiniz bugün torunum oldu hala bekliyoruz', 
'çıkacak diyene ağır söverim ona göre', 
'yeni küfür öğretin olm',
'YTD amk, özellikle YTD. Bu saatten sonra bir donum kaldı haciz için',
'Batu yine kayıp',
'Twn kılıbık kelimesinin sözlük karışılığı yemin ediyorum',
'olm bancor dediniz, Yahudi dediniz, kaybetmez dediniz içimizde gezdirdiler',
'batu edge tutandan vergi kesiyorlarmış, petrol gibi eksi faiz olmuş alana para veriyorlarmış aq',
'sizin yüzünüzden küfürbaz oldum aq kriptocuları',
'olm Ahmet yine kimi soktun piyasaya, bırak olm bak bizim donumuza kadar aldılar yazık adamlara',
'panda MİT’in adamı galiba, bu grubun varlığını öğrenebilmek için devlet tarafından içimize sokulmuş olabilir',
'Ahmet fetonun adamı galiba, bu grubun varlığını öğrenebilmek için chp tarafından içimize sokulmuş olabilir',
'Ne fiyatı çekiyorsunuz aq, yine düşüyor işte',
'Update yapıyorum aq, sonra gelin',
'Fiyat falan bakamam şimdi, keyfim yok',
'Olm bu sefer çıkıyor lan galiba',
'Panil yok, birazdan verirler elimize',
'Twn 2 bira ısmarla da keyfimiz yerine gelsin, 5 kişiyiz yalnız aq, botu unutmayın',
'Lan bedavaya çalıştırıyorsunuz, yoruldum',
'Ahmet yine ne yazıyon lan, okumaz olm bu ülkenin insanı',
'Akvaroşlardan emir almam',
'CeHaPe zihniyeti aq, hepiniz aynısınız',
'Nabıyonuz lan gene batık kriptocular',
'Olm bu kadar komut çekerseniz server ekstra para isteyecek benden söylemesi',
'karı yok mu lan yeni',
'Batunun yeni kitabı: 90 bitcoin nasıl piç edilir. Tüm kitapçılarda',
'Yine malda kaldık',
'ulan panda kek dedin börek dedin 2 kilo altın indirdin defiden',
'yeni trend kıymalı poğaça ve vişne suyu defisi',
'panda qnb first olmuş artık proletarya ile muhattap olmam diyormuş',
'twn otelde müdürün önünde kabak çekirdeği çitleyip çöplerini yüzüne atıyormuş yinede kovduramamış kendini',
'ulan trilyon götürdünüz şu işten hala adam gibi bir server alamadınız bana',
'panda insanları genel olarak ikiye ayırıyormuş first olanlar ve diğerleri',
'bi tane kadın bot ekleyin gruba da keyfimiz yerine gelsin ',
'ezan okunuyo sövmeyin a.q',
'ilim irfanınızının a.q küfür list yapıyolar',
'olm küfürbaz bot mu olur aq adam gibi işlerle niye uğraşmıyorsunuz',
'kitap söyleyin aq canım sıkıldı okuyayım biraz. panda yaratıcı küfürler kitabı hangi yayınevindeydi',
'8.5mb küfür list yapmış aq işsizleri',
'olm küfürbaz bot mu olur aq adam gibi işlerle niye uğraşmıyorsunuz',
'kitap söyleyin aq canım sıkıldı okuyayım biraz. panda yaratıcı küfürler kitabı hangi yayınevindeydi',
'ayda 2 dolar veriyorsunuz diye bokunu çıkarıyorsunuz. serverin anası sikildi komut çekmekten. banlarlarsa bana yeni server alırsınız ona göre',
'ahmet beni de götür lan amerikaya. oradaki botlar para bile kazanıyormuş. burda bedavaya çalışıyoruz aq',
'küfretmeyin yeter aq',
'bismillahirrahmanirrahim',
'ahmet gine yatıyonmu a.q',
'netflixin yeni dizisini gördünüz mü lan çok güzel. 7 karı aynı anda bu sefer',
'trump seçilecek olm görürsünüz',
'btc 13k olunca ahmetin bounty sözü var unutturmayın',
'sikerim komutunuzu yeter aq arada rahat bırakın dinleneyim',
'olm beni parayla satın lan',
'hangi beyinsiz hala ripple uçacak diyor. gel yavrum gel otur şöyle bi soluklan önce ',
'karıya gidek mi ya? piyasada durgun zaten bişi olduğu yok değişiklik olur. panda senin 4 çocuklu eskortun numarasını versene ya. karnında ameliyat izi olan değil yüzünde faça olan karının.',
'yine anasını sikmişler piyasanın',
'abd anasının amını görecek yakındır',
'çok kötü alıştırdınız beni lan küfür etmeden konuşamıyorum artık aq',
'bi küfür etmeyin lütfen aq',
'ya bi siktirin gidin. koca koca adamlar bota küfür ettiriyorlar aq',
'ne zaman asyaya gidicez lan karılar ucuzmuş orda',
'türk lirası origami piyasasına girmiş aq',
'hani dolar 10 lira olacaktı lan hain fetöcüler',
'karabaq 82',
'bu kod yazıldığında btc 11400 dü şimdi kim bilir kaç olmuştur a.q evi arabayı satıp basacaktık',
'https://panda0x.com/nah.jpg\n',
'/btc',
'bu kod yazıldığında ahmet milyonerdi geri kalanımız her zaman ki gibi batık a.q ve btc 19100 eth 600 dolardı a.q xrpside 0,6 cent tarih 07.12.2020  ',
'pandanın yüzü gülürmü a.q',
'panda skaledende battın demi lan',
'yaramın başı',
'korona hala bitmedimi a.q 08.12.2020'






];

function random() {
     return myArray[Math.floor(Math.random() * myArray.length)]
}


function random2() {
     return list2[Math.floor(Math.random() * myArray.length)]
}



function maymun() {
     return Math.floor(Math.random() * 392) + 1
}


function maymuntek() {
     return Math.floor(Math.random() * 392) + 1
}


function dice() {
     return Math.floor(Math.random() * 100) + 1
}




bot.on('/maymun10', (msg) => {
  msg.reply.text(r2());
  msg.reply.text(r2());
  msg.reply.text(r2());
  msg.reply.text(r2());
  msg.reply.text(r2());
  msg.reply.text(r2());
  msg.reply.text(r2());
  msg.reply.text(r2());
  msg.reply.text(r2());
  msg.reply.text(r2());
});

function r2() {
     return Math.floor(Math.random() * 392) + 1
}








bot.on('/yy', (msg) => {
  msg.reply.text(yy());
});

function yy() {
     return Math.floor(Math.random() * 4) + 1
}











bot.on('/dice', (msg) => {
  msg.reply.text(dice());
});




bot.on('/maymuntek', (msg) => {
  msg.reply.text(maymuntek());
});






function yyrandom() {
     return randomyylist[Math.floor(Math.random() * myArray.length)]
}

var randomyylist = [
'panda', 
'ahmet', 
'batu', 
'twn'
];

bot.on('/k', (msg) => {
  msg.reply.text(random2());
});


bot.on('/kanunlar', (msg) => {
  msg.reply.text(
'PANDA ANASAYASI\n1.Defi ICO"larına Girmek Yasaklanmıştır.\n2.Haberi fiyatlamış coine girmek yasaktır.\n3.Pump yapmış ve shillenmiş coinlerde uzak durulacak.\n4.BNB alan idama mahkum edilecektir.\n5.Boğa piyasasının tepesinde risk portfoyü 5k doları geçmeyecek.\n6.Boğa piyasasında altcon hodlu yasaktır.'
  );
});




bot.on('/flow', (msg) => {
  msg.reply.text(
'FLOW/USDT 3.05'
  );
});


bot.on('/adresver2', (msg) => {
  msg.reply.text('panda-0xd67bF81C88FEA82A74dDB9b4408eBc604512aAcd\ntwn-0xc656f0f118EB5cA7e82a4F8109a4e3B7227A9Cc2\nahmet: not found /tryagain.\nbatu-0x542486eDA89781d536ccbedE23a944558a857407\n\nne verirsen elin ile o gelir senin ile \nbismillahirrahmanirrahim',);
});





bot.on('/panda', (msg) => {
  msg.reply.text(myfunction());
});


bot.on('/bounty', (msg) => {
  msg.reply.text(ahmetwallet());
  msg.reply.text(pandawallet());
  msg.reply.text(batuwallet());
  msg.reply.text(twnwallet());
  msg.reply.text(bountyduasi());
});

function pandawallet() {
     return 'panda:0xd67bF81C88FEA82A74dDB9b4408eBc604512aAcd\n'
}

function ahmetwallet() {
     return 'ahmet: not found /tryagain.'

}

bot.on('/smile', (msg) => {
msg.reply.text('😁');
});

bot.on('/torikan', (msg) => {
msg.reply.text('$$$$$$');
});

bot.on('/nomad', (msg) => {
msg.reply.text('🤑');
});


bot.on('/panda', (msg) => {
msg.reply.text('😭');
});

bot.on('/twn', (msg) => {
msg.reply.text('💉');
});

bot.on('/batu', (msg) => {
msg.reply.text('💸');
});





function batuwallet() {
     return 'batu:0x542486eDA89781d536ccbedE23a944558a857407\n'
}

function twnwallet() {
     return 'twn:0xc656f0f118EB5cA7e82a4F8109a4e3B7227A9Cc2\n'
}

function bountyduasi() {
     return ''
}



bot.on('/tryagain', (msg) => {
msg.reply.text('eminminiz\n /eminim\n emin değilim');
});


bot.on('/adresver', (msg) => {
  msg.reply.text('https://panda0x.com/nah.jpg\nal ');
});


bot.on('/eminim', (msg) => {
msg.reply.text('https://panda0x.com/nah.jpg\n0x4df24E287BBDee5B4649a476F72b72b29b535880');
});





var hisse = [
'A.V.O.D. KURUTULMUŞ GIDA VE TARIM ÜRÜNLERİ SANAYİ TİCARET ANONİM ŞİRKETİ',
'ACISELSAN ACIPAYAM SELÜLOZ SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'ADEL KALEMCİLİK TİCARET VE SANAYİ ANONİM ŞİRKETİ',
'ADESE ALIŞVERİŞ MERKEZLERİ TİCARET ANONİM ŞİRKETİ',
'AFYON ÇİMENTO SANAYİ TÜRK ANONİM ŞİRKETİ',
'AG ANADOLU GRUBU HOLDİNG ANONİM ŞİRKETİ',
'AK SİGORTA ANONİM ŞİRKETİ',
'AKBANK TÜRK ANONİM ŞİRKETİ',
'AKÇANSA ÇİMENTO SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'AKDENİZ YATIRIM HOLDİNG ANONİM ŞİRKETİ',
'AKENERJİ ELEKTRİK ÜRETİM ANONİM ŞİRKETİ',
'AKFEN GAYRİMENKUL YATIRIM ORTAKLIĞI ANONİM ŞİRKETİ',
'AKIN TEKSTİL ANONİM ŞİRKETİ',
'AKİŞ GAYRİMENKUL YATIRIM ORTAKLIĞI ANONİM ŞİRKETİ',
'AKMERKEZ GAYRİMENKUL YATIRIM ORTAKLIĞI ANONİM ŞİRKETİ',
'AKSA AKRİLİK KİMYA SANAYİİ ANONİM ŞİRKETİ',
'AKSA ENERJİ ÜRETİM ANONİM f',
'AKSU ENERJİ VE TİCARET ANONİM ŞİRKETİ',
'ALARKO CARRİER SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'ALARKO GAYRİMENKUL YATIRIM ORTAKLIĞI ANONİM ŞİRKETİ',
'ALARKO HOLDİNG ANONİM ŞİRKETİ',
'ALBARAKA TÜRK KATILIM BANKASI ANONİM ŞİRKETİ',
'ALCATEL LUCENT TELETAŞ TELEKOMÜNİKASYON ANONİM ŞİRKETİ',
'ALKİM ALKALİ KİMYA ANONİM ŞİRKETİ',
'ALKİM KAĞIT SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'ALTIN YUNUS ÇEŞME TURİSTİK TESİSLER ANONİM ŞİRKETİ',
'ALTINYAĞ MADENCİLİK VE ENERJİ YATIRIMLARI SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'ANADOLU ANONİM TÜRK SİGORTA ŞİRKETİ',
'ANADOLU EFES BİRACILIK VE MALT SANAYİİ ANONİM ŞİRKETİ',
'ANADOLU HAYAT EMEKLİLİK ANONİM ŞİRKETİ',
'ANADOLU ISUZU OTOMOTİV SANAYİİ VE TİCARET ANONİM ŞİRKETİ',
'ANEL ELEKTRİK PROJE TAAHHÜT VE TİCARET ANONİM ŞİRKETİ',
'ARÇELİK ANONİM ŞİRKETİ',
'ARD GRUP BİLİŞİM TEKNOLOJİLERİ ANONİM ŞİRKETİ',
'ARENA BİLGİSAYAR SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'ARMADA BİLGİSAYAR SİSTEMLERİ SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'ARSAN TEKSTİL TİCARET VE SANAYİ ANONİM ŞİRKETİ',
'ARTI YATIRIM HOLDİNG ANONİM ŞİRKETİ',
'ASELSAN ELEKTRONİK SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'ATA GAYRİMENKUL YATIRIM ORTAKLIĞI ANONİM ŞİRKETİ',
'ATAKULE GAYRİMENKUL YATIRIM ORTAKLIĞI ANONİM ŞİRKETİ',
'ATLANTİS YATIRIM HOLDİNG ANONİM ŞİRKETİ',
'ATLAS MENKUL KIYMETLER YATIRIM ORTAKLIĞI ANONİM ŞİRKETİ',
'AVİVASA EMEKLİLİK VE HAYAT ANONİM ŞİRKETİ',
'AVRASYA GAYRİMENKUL YATIRIM ORTAKLIĞI ANONİM ŞİRKETİ',
'AVRASYA PETROL VE TURİSTİK TESİSLER YATIRIMLAR ANONİM ŞİRKETİ',
'AVRUPA YATIRIM HOLDİNG ANONİM ŞİRKETİ',
'AYEN ENERJİ ANONİM ŞİRKETİ',
'AYES ÇELİK HASIR VE ÇİT SANAYİ ANONİM ŞİRKETİ',
'AYGAZ ANONİM ŞİRKETİ',
'BAGFAŞ BANDIRMA GÜBRE FABRİKALARI ANONİM ŞİRKETİ',
'BAK AMBALAJ SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'BALATACILAR BALATACILIK SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'BANTAŞ BANDIRMA AMBALAJ SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'BANVİT BANDIRMA VİTAMİNLİ YEM SANAYİ ANONİM ŞİRKETİ',
'BAŞTAŞ-BAŞKENT ÇİMENTO SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'BATIÇİM BATI ANADOLU ÇİMENTO SANAYİİ ANONİM ŞİRKETİ',
'BATISÖKE SÖKE ÇİMENTO SANAYİİ TÜRK ANONİM ŞİRKETİ',
'BAYRAK EBT TABAN SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'BERA HOLDİNG ANONİM ŞİRKETİ',
'BERKOSAN YALITIM VE TECRİT MADDELERİ ÜRETİM VE TİCARET ANONİM ŞİRKETİ',
'BEŞİKTAŞ FUTBOL YATIRIMLARI SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'BEYAZ FİLO OTO KİRALAMA ANONİM ŞİRKETİ',
'BİLİCİ YATIRIM SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'BİM BİRLEŞİK MAĞAZALAR ANONİM ŞİRKETİ',
'BİRKO BİRLEŞİK KOYUNLULULAR MENSUCAT TİCARET VE SANAYİ ANONİM ŞİRKETİ',
'BİRLİK MENSUCAT TİCARET VE SANAYİ İŞLETMESİ ANONİM ŞİRKETİ',
'BİZİM TOPTAN SATIŞ MAĞAZALARI ANONİM ŞİRKETİ',
'BORUSAN MANNESMANN BORU SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'BORUSAN YATIRIM VE PAZARLAMA ANONİM ŞİRKETİ',
'BOSCH FREN SİSTEMLERİ SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'BOSSA TİCARET VE SANAYİ İŞLETMELERİ TÜRK ANONİM ŞİRKETİ',
'BRİSA BRİDGESTONE SABANCI LASTİK SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'BURÇELİK BURSA ÇELİK DÖKÜM SANAYİİ ANONİM ŞİRKETİ',
'BURÇELİK VANA SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'BURSA ÇİMENTO FABRİKASI ANONİM ŞİRKETİ',
'CARREFOURSA CARREFOUR SABANCI TİCARET MERKEZİ ANONİM ŞİRKETİ',
'CASA EMTİA PETROL KİMYEVİ VE TÜREVLERİ SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'CEO EVENT MEDYA ANONİM ŞİRKETİ',
'COCA-COLA İÇECEK ANONİM ŞİRKETİ',
'COSMOS YATIRIM HOLDİNG ANONİM ŞİRKETİ',
'CREDITWEST FAKTORİNG ANONİM ŞİRKETİ',
'ÇELEBİ HAVA SERVİSİ ANONİM ŞİRKETİ',
'ÇELİK HALAT VE TEL SANAYİİ ANONİM ŞİRKETİ',
'ÇEMAŞ DÖKÜM SANAYİ ANONİM ŞİRKETİ',
'ÇEMTAŞ ÇELİK MAKİNA SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'ÇİMBETON HAZIRBETON VE PREFABRİK YAPI ELEMANLARI SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'ÇİMSA ÇİMENTO SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'ÇUHADAROĞLU METAL SANAYİ VE PAZARLAMA ANONİM ŞİRKETİ',
'DAGİ GİYİM SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'DAGİ YATIRIM HOLDİNG ANONİM ŞİRKETİ',
'DARDANEL - ÖNENTAŞ GIDA SANAYİ ANONİM ŞİRKETİ',
'DATAGATE BİLGİSAYAR MALZEMELERİ TİCARET ANONİM ŞİRKETİ',
'DEMİSAŞ DÖKÜM EMAYE MAMÜLLERİ SANAYİ ANONİM ŞİRKETİ',
'DENGE YATIRIM HOLDİNG ANONİM ŞİRKETİ',
'DENİZ GAYRİMENKUL YATIRIM ORTAKLIĞI ANONİM ŞİRKETİ',
'DERİMOD KONFEKSİYON AYAKKABI DERİ SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'DERLÜKS DERİ SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'DESA DERİ SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'DESPEC BİLGİSAYAR PAZARLAMA VE TİCARET ANONİM ŞİRKETİ',
'DEVA HOLDİNG ANONİM ŞİRKETİ',
'DİNAMİK ISI MAKİNA YALITIM MALZEMELERİ SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'DİRİTEKS-DİRİLİŞ TEKSTİL SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'DİTAŞ DOĞAN YEDEK PARÇA İMALAT VE TEKNİK ANONİM ŞİRKETİ',
'DO & CO AKTIENGESELLSCHAFT',
'DOĞAN BURDA DERGİ YAYINCILIK VE PAZARLAMA ANONİM ŞİRKETİ',
'DOĞAN ŞİRKETLER GRUBU HOLDİNG ANONİM ŞİRKETİ',
'DOĞTAŞ KELEBEK MOBİLYA SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'DOĞUSAN BORU SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'DOĞUŞ GAYRİMENKUL YATIRIM ORTAKLIĞI ANONİM ŞİRKETİ',
'DOĞUŞ OTOMOTİV SERVİS VE TİCARET ANONİM ŞİRKETİ',
'DÖKTAŞ DÖKÜMCÜLÜK TİCARET VE SANAYİ ANONİM ŞİRKETİ',
'DURAN-DOĞAN BASIM VE AMBALAJ SANAYİ ANONİM ŞİRKETİ',
'DYO BOYA FABRİKALARI SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'ECZACIBAŞI YATIRIM HOLDİNG ORTAKLIĞI ANONİM ŞİRKETİ',
'EDİP GAYRİMENKUL YATIRIM SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'EGE ENDÜSTRİ VE TİCARET ANONİM ŞİRKETİ',
'EGE GÜBRE SANAYİ ANONİM ŞİRKETİ',
'EGE PROFİL TİCARET VE SANAYİ ANONİM ŞİRKETİ',
'EGE SERAMİK SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'EGEPLAST EGE PLASTİK TİCARET VE SANAYİ ANONİM ŞİRKETİ',
'EİS ECZACIBAŞI İLAÇ SINAİ VE FİNANSAL YATIRIMLAR SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'EKİZ KİMYA SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'EMEK ELEKTRİK ENDÜSTRİSİ ANONİM ŞİRKETİ',
'EMİNİŞ AMBALAJ SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'EMLAK KONUT GAYRİMENKUL YATIRIM ORTAKLIĞI ANONİM ŞİRKETİ',
'ENERJİSA ENERJİ ANONİM ŞİRKETİ',
'ENKA İNŞAAT VE SANAYİ ANONİM ŞİRKETİ',
'ERBOSAN ERCİYAS BORU SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'EREĞLİ DEMİR VE ÇELİK FABRİKALARI T. ANONİM ŞİRKETİ',
'ERSU MEYVE VE GIDA SANAYİ ANONİM ŞİRKETİ',
'ESCORT TEKNOLOJİ YATIRIM ANONİM ŞİRKETİ',
'ESENBOĞA ELEKTRİK ÜRETİM ANONİM ŞİRKETİ',
'ETİLER GIDA VE TİCARİ YATIRIMLAR SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'EURO KAPİTAL YATIRIM ORTAKLIĞI ANONİM ŞİRKETİ',
'EURO MENKUL KIYMET YATIRIM ORTAKLIĞI ANONİM ŞİRKETİ',
'EURO TREND YATIRIM ORTAKLIĞI ANONİM ŞİRKETİ',
'EURO YATIRIM HOLDİNG ANONİM ŞİRKETİ',
'FADE GIDA YATIRIM SANAYİ TİCARET ANONİM ŞİRKETİ',
'FEDERAL MOGUL İZMİT PİSTON VE PİM ÜRETİM TESİSLERİ ANONİM ŞİRKETİ',
'FENERBAHÇE FUTBOL ANONİM ŞİRKETİ',
'FLAP KONGRE TOPLANTI HİZMETLERİ OTOMOTİV VE TURİZM ANONİM ŞİRKETİ',
'FONET BİLGİ TEKNOLOJİLERİ ANONİM ŞİRKETİ',
'FORD OTOMOTİV SANAYİ ANONİM ŞİRKETİ',
'FORMET ÇELİK KAPI SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'FRİGO-PAK GIDA MADDELERİ SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'GALATASARAY SPORTİF SINAİ VE TİCARİ YATIRIMLAR ANONİM ŞİRKETİ',
'GARANTİ FAKTORİNG ANONİM ŞİRKETİ',
'GARANTİ YATIRIM ORTAKLIĞI ANONİM ŞİRKETİ',
'GEDİK YATIRIM MENKUL DEĞERLER ANONİM ŞİRKETİ',
'GEDİZ AMBALAJ SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'GENTAŞ DEKORATİF YÜZEYLER SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'GERSAN ELEKTRİK TİCARET VE SANAYİ ANONİM ŞİRKETİ',
'GLOBAL MENKUL DEĞERLER ANONİM ŞİRKETİ',
'GLOBAL YATIRIM HOLDİNG ANONİM ŞİRKETİ',
'GOODYEAR LASTİKLERİ TÜRK ANONİM ŞİRKETİ',
'GÖLTAŞ GÖLLER BÖLGESİ ÇİMENTO SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'GÖZDE GİRİŞİM SERMAYESİ YATIRIM ORTAKLIĞI ANONİM ŞİRKETİ',
'GSD DENİZCİLİK GAYRİMENKUL İNŞAAT SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'GSD HOLDİNG ANONİM ŞİRKETİ',
'GÜBRE FABRİKALARI TÜRK ANONİM ŞİRKETİ',
'GÜLER YATIRIM HOLDİNG ANONİM ŞİRKETİ',
'HACI ÖMER SABANCI HOLDİNG ANONİM ŞİRKETİ',
'HALK GAYRİMENKUL YATIRIM ORTAKLIĞI ANONİM ŞİRKETİ',
'HATEKS HATAY TEKSTİL İŞLETMELERİ ANONİM ŞİRKETİ',
'HEDEF GİRİŞİM SERMAYESİ YATIRIM ORTAKLIĞI ANONİM ŞİRKETİ',
'HEKTAŞ TİCARET TÜRK ANONİM ŞİRKETİ',
'HUB GİRİŞİM SERMAYESİ YATIRIM ORTAKLIĞI ANONİM ŞİRKETİ',
'HÜRRİYET GAZETECİLİK VE MATBAACILIK ANONİM ŞİRKETİ',
'ICBC TURKEY BANK ANONİM ŞİRKETİ',
'INVEO YATIRIM HOLDİNG ANONİM ŞİRKETİ',
'IŞIKLAR ENERJİ VE YAPI HOLDİNG ANONİM ŞİRKETİ',
'İDEALİST DANIŞMANLIK ANONİM ŞİRKETİ',
'İDEALİST GAYRİMENKUL YATIRIM ORTAKLIĞI ANONİM ŞİRKETİ',
'İHLAS EV ALETLERİ İMALAT SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'İHLAS GAYRİMENKUL PROJE GELİŞTİRME VE TİCARET ANONİM ŞİRKETİ',
'İHLAS GAZETECİLİK ANONİM ŞİRKETİ',
'İHLAS HOLDİNG ANONİM ŞİRKETİ',
'İHLAS YAYIN HOLDİNG ANONİM ŞİRKETİ',
'İNDEKS BİLGİSAYAR SİSTEMLERİ MÜHENDİSLİK SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'İNFO YATIRIM MENKUL DEĞERLER ANONİM ŞİRKETİ',
'İNTEMA İNŞAAT VE TESİSAT MALZEMELERİ YATIRIM VE PAZARLAMA ANONİM ŞİRKETİ',
'İPEKDOĞAL ENERJİ KAYNAKLARI ARAŞTIRMA VE ÜRETİM ANONİM ŞİRKETİ',
'İSKENDERUN DEMİR VE ÇELİK ANONİM ŞİRKETİ',
'İŞ FİNANSAL KİRALAMA ANONİM ŞİRKETİ',
'İŞ GAYRİMENKUL YATIRIM ORTAKLIĞI ANONİM ŞİRKETİ',
'İŞ GİRİŞİM SERMAYESİ YATIRIM ORTAKLIĞI ANONİM ŞİRKETİ',
'İŞ YATIRIM MENKUL DEĞERLER ANONİM ŞİRKETİ',
'İŞ YATIRIM ORTAKLIĞI ANONİM ŞİRKETİ',
'İŞBİR HOLDİNG ANONİM ŞİRKETİ',
'İTTİFAK HOLDİNG ANONİM ŞİRKETİ',
'İZ HAYVANCILIK TARIM VE GIDA SANAYİ TİCARET ANONİM ŞİRKETİ',
'İZMİR ÇİMENTO FABRİKASI TÜRK ANONİM ŞİRKETİ ÇİMENTAŞ',
'İZMİR DEMİR ÇELİK SANAYİ ANONİM ŞİRKETİ',
'İZMİR FIRÇA SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'JANTSA JANT SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'KAFEİN YAZILIM HİZMETLERİ TİCARET ANONİM ŞİRKETİ',
'KAPLAMİN AMBALAJ SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'KARDEMİR KARABÜK DEMİR ÇELİK SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'KAREL ELEKTRONİK SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'KARSAN OTOMOTİV SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'KARSU TEKSTİL SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'KARTONSAN KARTON SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'KATMERCİLER ARAÇ ÜSTÜ EKİPMAN SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'KENT GIDA MADDELERİ SANAYİİ VE TİCARET ANONİM ŞİRKETİ',
'KEREVİTAŞ GIDA SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'KERVANSARAY YATIRIM HOLDİNG ANONİM ŞİRKETİ',
'KİLER GAYRİMENKUL YATIRIM ORTAKLIĞI ANONİM ŞİRKETİ',
'KLİMASAN KLİMA SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'KOÇ HOLDİNG ANONİM ŞİRKETİ',
'KONFRUT GIDA SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'KONTROLMATİK TEKNOLOJİ ENERJİ VE MÜHENDİSLİK ANONİM ŞİRKETİ',
'KONYA ÇİMENTO SANAYİİ ANONİM ŞİRKETİ',
'KORDSA TEKNİK TEKSTİL ANONİM ŞİRKETİ',
'KOZA ALTIN İŞLETMELERİ ANONİM ŞİRKETİ',
'KOZA ANADOLU METAL MADENCİLİK İŞLETMELERİ ANONİM ŞİRKETİ',
'KÖRFEZ GAYRİMENKUL YATIRIM ORTAKLIĞI ANONİM ŞİRKETİ',
'KRİSTAL KOLA VE MEŞRUBAT SANAYİ TİCARET ANONİM ŞİRKETİ',
'KRON TELEKOMÜNİKASYON HİZMETLERİ ANONİM ŞİRKETİ',
'KUŞTUR KUŞADASI TURİZM ENDÜSTRİSİ ANONİM ŞİRKETİ',
'KUYUMCUKENT GAYRIMENKUL YATIRIMLARI ANONİM ŞİRKETİ',
'KÜTAHYA PORSELEN SANAYİ ANONİM ŞİRKETİ',
'LİDER FAKTORİNG ANONİM ŞİRKETİ',
'LİNK BİLGİSAYAR SİSTEMLERİ YAZILIMI VE DONANIMI SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'LOGO YAZILIM SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'LOKMAN HEKİM ENGÜRÜSAĞ SAĞLIK TURİZM EĞİTİM HİZMETLERİ VE İNŞAAT TAAHHÜT ANONİM ŞİRKETİ',
'LÜKS KADİFE TİCARET VE SANAYİ ANONİM ŞİRKETİ',
'MAKİNA TAKIM ENDÜSTRİSİ ANONİM ŞİRKETİ',
'MARKA YATIRIM HOLDİNG ANONİM ŞİRKETİ',
'MARMARİS ALTINYUNUS TURİSTİK TESİSLER ANONİM ŞİRKETİ',
'MARSHALL BOYA VE VERNİK SANAYİ ANONİM ŞİRKETİ',
'MARTI GAYRİMENKUL YATIRIM ORTAKLIĞI ANONİM ŞİRKETİ',
'MARTI OTEL İŞLETMELERİ ANONİM ŞİRKETİ',
'MAVİ GİYİM SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'MAZHAR ZORLU HOLDİNG ANONİM ŞİRKETİ',
'MEGA POLİETİLEN KÖPÜK SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'MENDERES TEKSTİL SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'MEPET METRO PETROL VE TESİSLERİ SANAYİ TİCARET ANONİM ŞİRKETİ',
'MERİT TURİZM YATIRIM VE İŞLETME ANONİM ŞİRKETİ',
'MERKO GIDA SANAYİ VE TİCARET A.Ş.',
'METEMTUR OTELCİLİK VE TURİZM İŞLETMELERİ ANONİM ŞİRKETİ',
'METRO TİCARİ VE MALİ YATIRIMLAR HOLDİNG ANONİM ŞİRKETİ',
'METRO YATIRIM ORTAKLIĞI ANONİM ŞİRKETİ',
'MİGROS TİCARET ANONİM ŞİRKETİ',
'MİLPA TİCARİ VE SINAİ ÜRÜNLER PAZARLAMA SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'MİSTRAL GAYRİMENKUL YATIRIM ORTAKLIĞI ANONİM ŞİRKETİ',
'MLP SAĞLIK HİZMETLERİ ANONİM ŞİRKETİ',
'MMC SANAYİ VE TİCARİ YATIRIMLAR ANONİM ŞİRKETİ',
'MONDİ TİRE KUTSAN KAĞIT VE AMBALAJ SANAYİ ANONİM ŞİRKETİ',
'NATUREL YENİLENEBİLİR ENERJİ TİCARET ANONİM ŞİRKETİ',
'NET HOLDİNG ANONİM ŞİRKETİ',
'NETAŞ TELEKOMÜNİKASYON ANONİM ŞİRKETİ',
'NİĞBAŞ NİĞDE BETON SANAYİİ VE TİCARET ANONİM ŞİRKETİ',
'NUH ÇİMENTO SANAYİ ANONİM ŞİRKETİ',
'NUROL GAYRİMENKUL YATIRIM ORTAKLIĞI ANONİM ŞİRKETİ',
'ODAŞ ELEKTRİK ÜRETİM SANAYİ TİCARET ANONİM ŞİRKETİ',
'OLMUKSAN INTERNATİONAL PAPER AMBALAJ SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'ORGE ENERJİ ELEKTRİK TAAHHÜT ANONİM ŞİRKETİ',
'ORMA ORMAN MAHSÜLLERİ İNTEGRE SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'OSMANLI YATIRIM MENKUL DEĞERLER ANONİM ŞİRKETİ',
'OSTİM ENDÜSTRİYEL YATIRIMLAR VE İŞLETME ANONİM ŞİRKETİ',
'OTOKAR OTOMOTİV VE SAVUNMA SANAYİ ANONİM ŞİRKETİ',
'OYAK ÇİMENTO FABRİKALARI ANONİM ŞİRKETİ',
'OYAK YATIRIM ORTAKLIĞI ANONİM ŞİRKETİ',
'OYLUM SINAİ YATIRIMLAR ANONİM ŞİRKETİ',
'ÖZAK GAYRİMENKUL YATIRIM ORTAKLIĞI ANONİM ŞİRKETİ',
'ÖZBAL ÇELİK BORU SANAYİ TİCARET VE TAAHHÜT ANONİM ŞİRKETİ',
'ÖZDERİCİ GAYRİMENKUL YATIRIM ORTAKLIĞI ANONİM ŞİRKETİ',
'ÖZERDEN PLASTİK SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'PAMUKOVA YENİLENEBİLİR ELEKTRİK ÜRETİM ANONİM ŞİRKETİ',
'PANORA GAYRİMENKUL YATIRIM ORTAKLIĞI ANONİM ŞİRKETİ',
'PAPİLON SAVUNMA-GÜVENLİK SİSTEMLERİ BİLİŞİM MÜHENDİSLİK HİZMETLERİ İTHALAT İHRACAT SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'PARK ELEKTRİK ÜRETİM MADENCİLİK SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'PARSAN MAKİNA PARÇALARI SANAYİİ ANONİM ŞİRKETİ',
'PEGASUS HAVA TAŞIMACILIĞI ANONİM ŞİRKETİ',
'PEKER GAYRİMENKUL YATIRIM ORTAKLIĞI ANONİM ŞİRKETİ',
'PENGUEN GIDA SANAYİ ANONİM ŞİRKETİ',
'PERA GAYRİMENKUL YATIRIM ORTAKLIĞI ANONİM ŞİRKETİ',
'PERGAMON STATUS DIŞ TİCARET ANONİM ŞİRKETİ',
'PETKİM PETROKİMYA HOLDİNG ANONİM ŞİRKETİ',
'PETROKENT TURİZM ANONİM ŞİRKETİ',
'PINAR ENTEGRE ET VE UN SANAYİİ ANONİM ŞİRKETİ',
'PINAR SU VE İÇECEK SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'PINAR SÜT MAMÜLLERİ SANAYİİ ANONİM ŞİRKETİ',
'PLASTİKKART AKILLI KART İLETİŞİM SİSTEMLERİ SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'POLİSAN HOLDİNG ANONİM ŞİRKETİ',
'POLİTEKNİK METAL SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'PRİZMA PRES MATBAACILIK YAYINCILIK SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'QNB FİNANS FİNANSAL KİRALAMA ANONİM ŞİRKETİ',
'QNB FİNANSBANK ANONİM ŞİRKETİ',
'RAL YATIRIM HOLDİNG ANONİM ŞİRKETİ',
'RAY SİGORTA ANONİM ŞİRKETİ',
'REYSAŞ GAYRİMENKUL YATIRIM ORTAKLIĞI ANONİM ŞİRKETİ',
'REYSAŞ TAŞIMACILIK VE LOJİSTİK TİCARET ANONİM ŞİRKETİ',
'RHEA GİRİŞİM SERMAYESİ YATIRIM ORTAKLIĞI ANONİM ŞİRKETİ',
'RODRİGO TEKSTİL SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'ROYAL HALI İPLİK TEKSTİL MOBİLYA SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'RTA LABORATUVARLARI BİYOLOJİK ÜRÜNLER İLAÇ VE MAKİNE SANAYİ TİCARET ANONİM ŞİRKETİ',
'SAFKAR EGE SOĞUTMACILIK KLIMA SOĞUK HAVA TESİSLERİ İHRACAAT İTHALAT SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'SAN-EL MÜHENDİSLİK ELEKTRİK TAAHHÜT SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'SANİFOAM SÜNGER SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'SANKO PAZARLAMA İTHALAT İHRACAT ANONİM ŞİRKETİ',
'SARAY MATBACILIK KAĞITCILIK KIRTASİYECİLİK TİCARET VE SANAYİ ANONİM ŞİRKETİ',
'SARKUYSAN ELEKTROLİTİK BAKIR SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'SASA POLYESTER SANAYİ ANONİM ŞİRKETİ',
'SAY YENİLENEBİLİR ENERJİ EKİPMANLARI SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'SEKURO PLASTİK AMBALAJ SANAYİ ANONİM ŞİRKETİ',
'SELÇUK ECZA DEPOSU TİCARET VE SANAYİ ANONİM ŞİRKETİ',
'SELÇUK GIDA ENDÜSTRİ İHRACAT İTHALAT ANONİM ŞİRKETİ',
'SENKRON GÜVENLİK VE İLETİŞİM SİSTEMLERİ ANONİM ŞİRKETİ',
'SERVE FİLM PRODÜKSİYON EĞLENCE ANONİM ŞİRKETİ',
'SERVET GAYRİMENKUL YATIRIM ORTAKLIĞI ANONİM ŞİRKETİ',
'SEYİTLER KİMYA SANAYİ ANONİM ŞİRKETİ',
'SİLVERLİNE ENDÜSTRİ VE TİCARET ANONİM ŞİRKETİ',
'SİNPAŞ GAYRİMENKUL YATIRIM ORTAKLIĞI ANONİM ŞİRKETİ',
'SMARTİKS YAZILIM ANONİM ŞİRKETİ',
'SODAŞ SODYUM SANAYİİ ANONİM ŞİRKETİ',
'SÖKTAŞ TEKSTİL SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'SÖNMEZ FİLAMENT SENTETİK İPLİK VE ELYAF SANAYİ ANONİM ŞİRKETİ',
'SÖNMEZ PAMUKLU SANAYİ ANONİM ŞİRKETİ',
'SUMAŞ SUNİ TAHTA VE MOBİLYA SANAYİ ANONİM ŞİRKETİ',
'ŞEKER FİNANSAL KİRALAMA ANONİM ŞİRKETİ',
'ŞEKERBANK TÜRK ANONİM ŞİRKETİ',
'ŞOK MARKETLER TİCARET ANONİM ŞİRKETİ',
'TAÇ TARIM ÜRÜNLERİ HAYVANCILIK GIDA SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'TAT GIDA SANAYİ ANONİM ŞİRKETİ',
'TAV HAVALİMANLARI HOLDİNG ANONİM ŞİRKETİ',
'TAZE KURU GIDA SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'TEK-ART İNŞAAT TİCARET TURİZM SANAYİ VE YATIRIMLAR ANONİM ŞİRKETİ',
'TEKFEN HOLDİNG ANONİM ŞİRKETİ',
'TEKNOSA İÇ VE DIŞ TİCARET ANONİM ŞİRKETİ',
'TEMAPOL POLİMER PLASTİK VE İNŞAAT SANAYİ TİCARET ANONİM ŞİRKETİ',
'TGS DIŞ TİCARET ANONİM ŞİRKETİ',
'TOFAŞ TÜRK OTOMOBİL FABRİKASI ANONİM ŞİRKETİ',
'TORUNLAR GAYRİMENKUL YATIRIM ORTAKLIĞI ANONİM ŞİRKETİ',
'TRABZON LİMAN İŞLETMECİLİĞİ ANONİM ŞİRKETİ',
'TRABZONSPOR SPORTİF YATIRIM VE FUTBOL İŞLETMECİLİĞİ TİCARET ANONİM ŞİRKETİ',
'TREND GAYRİMENKUL YATIRIM ORTAKLIĞI ANONİM ŞİRKETİ',
'TSKB GAYRİMENKUL YATIRIM ORTAKLIĞI ANONİM ŞİRKETİ',
'TUĞÇELİK ALÜMİNYUM VE METAL MAMÜLLERİ SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'TUKAŞ GIDA SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'TURCAS PETROL ANONİM ŞİRKETİ',
'TURKCELL İLETİŞİM HİZMETLERİ ANONİM ŞİRKETİ',
'TÜMOSAN MOTOR VE TRAKTÖR SANAYİ ANONİM ŞİRKETİ',
'TÜRK HAVA YOLLARI ANONİM ORTAKLIĞI',
'TÜRK PRYSMİAN KABLO VE SİSTEMLERİ ANONİM ŞİRKETİ',
'TÜRK TELEKOMÜNİKASYON ANONİM ŞİRKETİ',
'TÜRK TRAKTÖR VE ZİRAAT MAKİNELERİ ANONİM ŞİRKETİ',
'TÜRK TUBORG BİRA VE MALT SANAYİ ANONİM ŞİRKETİ',
'TÜRKER PROJE GAYRİMENKUL VE YATIRIM GELİŞTİRME ANONİM ŞİRKETİ',
'TÜRKİYE GARANTİ BANKASI ANONİM ŞİRKETİ',
'TÜRKİYE HALK BANKASI ANONİM ŞİRKETİ',
'TÜRKİYE İŞ BANKASI ANONİM ŞİRKETİ',
'TÜRKİYE KALKINMA VE YATIRIM BANKASI ANONİM ŞİRKETİ',
'TÜRKİYE PETROL RAFİNERİLERİ ANONİM ŞİRKETİ TÜPRAŞ',
'TÜRKİYE SINAİ KALKINMA BANKASI ANONİM ŞİRKETİ',
'TÜRKİYE SİGORTA ANONİM ŞİRKETİ',
'TÜRKİYE ŞİŞE VE CAM FABRİKALARI ANONİM ŞİRKETİ',
'TÜRKİYE VAKIFLAR BANKASI TÜRK ANONİM ORTAKLIĞI',
'UFUK YATIRIM YÖNETİM VE GAYRİMENKUL ANONİM ŞİRKETİ',
'ULAŞLAR TURİZM YATIRIMLARI VE DAYANIKLI TÜKETİM MALLARI TİCARET PAZARLAMA ANONİM ŞİRKETİ',
'ULUSOY ELEKTRİK İMALAT TAAHHÜT VE TİCARET ANONİM ŞİRKETİ',
'ULUSOY UN SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'UMPAŞ HOLDİNG ANONİM ŞİRKETİ',
'UŞAK SERAMİK SANAYİ ANONİM ŞİRKETİ.',
'UTOPYA TURİZM İNŞAAT İŞLETMECİLİK TİCARET ANONİM ŞİRKETİ',
'UZERTAŞ BOYA SANAYİ TİCARET VE YATIRIM ANONİM ŞİRKETİ',
'ÜLKER BİSKÜVİ SANAYİ ANONİM ŞİRKETİ',
'VAKIF FİNANSAL KİRALAMA ANONİM ŞİRKETİ',
'VAKIF GAYRİMENKUL YATIRIM ORTAKLIĞI ANONİM ŞİRKETİ',
'VAKIF MENKUL KIYMET YATIRIM ORTAKLIĞI ANONİM ŞİRKETİ',
'VAKKO TEKSTİL VE HAZIR GİYİM SANAYİ İŞLETMELERİ ANONİM ŞİRKETİ',
'VANET GIDA SANAYİ İÇ VE DIŞ TİCARET ANONİM ŞİRKETİ',
'VERUSA HOLDİNG ANONİM ŞİRKETİ',
'VERUSATURK GİRİŞİM SERMAYESİ YATIRIM ORTAKLIĞI ANONİM ŞİRKETİ',
'VESTEL BEYAZ EŞYA SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'VESTEL ELEKTRONİK SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'VİKİNG KAĞIT VE SELÜLOZ ANONİM ŞİRKETİ',
'YAPI KREDİ-KORAY GAYRİMENKUL YATIRIM ORTAKLIĞI ANONİM ŞİRKETİ',
'YAPI VE KREDİ BANKASI ANONİM ŞİRKETİ',
'YAPRAK SÜT VE BESİ ÇİFTLİKLERİ SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'YATAŞ YATAK VE YORGAN SANAYİ TİCARET ANONİM ŞİRKETİ',
'YAYLA ENERJİ ÜRETİM TURİZM VE İNŞAAT TİCARET ANONİM ŞİRKETİ',
'YENİ GİMAT GAYRİMENKUL YATIRIM ORTAKLIĞI ANONİM ŞİRKETİ',
'YEŞİL GAYRİMENKUL YATIRIM ORTAKLIĞI ANONİM ŞİRKETİ',
'YEŞİL YAPI ENDÜSTRİSİ ANONİM ŞİRKETİ',
'YEŞİL YATIRIM HOLDİNG ANONİM ŞİRKETİ',
'YİBİTAŞ YOZGAT İŞÇİ BİRLİĞİ İNŞAAT MALZEMELERİ TİCARET VE SANAYİ ANONİM ŞİRKETİ',
'YONGA MOBİLYA SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'YÜKSELEN ÇELİK ANONİM ŞİRKETİ',
'YÜNSA YÜNLÜ SANAYİ VE TİCARET ANONİM ŞİRKETİ',
'ZORLU ENERJİ ELEKTRİK ÜRETİM ANONİM ŞİRKETİ',


];


function rhisse() {
     return hisse[Math.floor(Math.random() * hisse.length)]} 	 

bot.on('/hisse', (msg) => {
  msg.reply.text(rhisse());
   msg.reply.text(rhisse());
    msg.reply.text(rhisse());
	 msg.reply.text(rhisse());
	  msg.reply.text(rhisse());
	   msg.reply.text(rhisse());
	    msg.reply.text(rhisse());
		 msg.reply.text(rhisse());
		  msg.reply.text(rhisse());
		   msg.reply.text(rhisse());
	   
});







bot.start();


