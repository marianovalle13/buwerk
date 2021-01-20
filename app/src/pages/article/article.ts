import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, App } from 'ionic-angular';
import { Constants } from '../../app/app.constants';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { Storage } from '@ionic/storage';
import { MPProvider } from '../../providers/mp/mp';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { LoginPage } from '../login/login';

import { UserProvider } from '../../providers/user/user';
import { ArticleProvider } from '../../providers/article/article';

@Component({
  selector: 'page-article',
  templateUrl: 'article.html',
  providers: [MPProvider, ArticleProvider, UserProvider]
})
export class ArticlePage {
  item: any = {
    id: 1,
    title: "Este es el título del artículo",
    category: "PRODUCTO",
    image: "assets/imgs/peinado.jpg",
    liked: false,
    locked: true,
    content: "<p>Fap jean shorts heirloom post-ironic squid viral Godard DIY Blue Bottle food truck +1 master cleanse Cosby sweater cardigan trust fund YOLO craft beer hoodie polaroid messenger bag banh mi you probably haven't heard of them Carles Kickstarter keytar Tonx hashtag selfies cliche drinking vinegar cred deep v Tumblr seitan wolf sustainable vegan quinoa beard single- origin </p><p>Coffee chambray kogi chillwave direct trade gastropub flannel roof party 3 wolf moon hella small batch mixtape scenester McSweeney's biodiesel brunch try-hard Helvetica Pitchfork raw denim stumptown kitsch photo booth selvage wayfarers bicycle rights irony yr four loko Marfa Schlitz dreamcatcher fingerstache blog twee disrupt lo-fi Intelligentsia </p><p>Leggings Brooklyn Portland banjo put a bird on it Etsy American Apparel tofu mumblecore Wes Anderson XOXO salvia fashion axe locavore art party forage artisan VHS retro letterpress pour - over Vice 8 - bit normcore semiotics Truffaut sriracha vinyl street art chia ugh narwhal next level 90's Austin meggings keffiyeh gluten-free farm-to-table occupy organic whatever plaid tattooed paleo pug church - key butcher cray bespoke PBR & B Shoreditch </p><p>Lomo shabby chic gentrify freegan mlkshk flexitarian PBR kale chips ethical Thundercats pop - up Banksy ennui iPhone Williamsburg pork belly mustache Echo Park skateboard slow - carb crucifix swag tousled Neutra Odd Future bitters fixie pickled High Life actually umami cornhole before they sold out asymmetrical Pinterest Bushwick </p>"
  }
  access: any;
  user: any;

  article:any;
  category = Constants.CATEGORY;

  //
  likedByUser: boolean = false;
  amountOfLikes = 0;


  constructor(
    private youtube: YoutubeVideoPlayer,
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public alertCtrl: AlertController,
    public app: App,
    public mpProvider: MPProvider,
    public iab: InAppBrowser,
    public userProvider: UserProvider,
    public articleProvider: ArticleProvider,

  ) {
    this.article = this.navParams.get('article');
    this.access = this.navParams.get('access');
    if(!this.article.images) this.article.images =[];
    if(this.article.images.length <= 0) this.article.images.push(this.article.image);
    this.storage.get(Constants.storage.user).then((val) => {
      this.user = val;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticlePage');
  }

  ionViewDidEnter(){
    console.log("ionViewWillEnter")

    // isLiked
    for (let i of this.article.like) {
      console.log("i" + i)
      console.log("this.user.id" + this.user.id)

      if (i.id == this.user.id) {
        this.likedByUser = true;
        console.log(this.likedByUser);
      }
    }
    
  }

  getBackground(image) {
    console.log(image);
    let bg;
    bg = 'linear-gradient(rgba(244, 244, 244, 0), rgba(244, 244, 244, 0.5) 70%, rgba(244, 244, 244, 1) 100%), url(' + Constants.FILES_BASE_URL + "/" + image + ')';
    return bg;
  }

  openVideo(){
    this.youtube.openVideo(this.article.video);
  }
  confirmPayment() {
    let alert = this.alertCtrl.create({
      title: 'Importante',
      subTitle: 'La acreditación inmediata de su pago es solo con tarjeta de crédito.',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Entendido',
          handler: () => {
            console.log('Agree clicked');
            this.payArticle();
          }
        }]
    });
    alert.present();
  }

  payArticle() {
    if (this.user && (this.user != "-1")) {
      let self = this;

      this.mpProvider.getArticleInitPoint(this.user, this.article)
        .then((res: any) => {
          console.log(res.initPoint);
          const browser = this.iab.create(res.initPoint);
          browser.on('exit').subscribe(event => {
            setTimeout(() => {
              self.navCtrl.pop();
            }, 1500);
          });
        })
        .catch(error => {
          alert("No se puede obtener el link de pago");
        })
    } else {
      this.app.getRootNav().setRoot(LoginPage);
    }
  }

  // -----------

  // 
  like() {
    this.likedByUser = true;

    let articleItem = {
      id: this.article.id,
      like: this.article.like
    }

    articleItem.like.push(this.user)

    this.articleProvider.update(articleItem)
      .then(articleU => {
        console.log(articleU)

        // this.countLikes()

      }).catch(error => {
        alert("error1: " + error);
      })
  }

  //
  unLike(){
    console.log("unlike");
    for (let i of this.article.like) {

      if (i.id == this.user.id) {
        console.log(this.likedByUser);

        let index = this.article.like.indexOf(i);

        let articleItem = {
          id: this.article.id,
          like: this.article.like
        }

        articleItem.like.splice(index, 1);

        this.articleProvider.update(articleItem)
          .then(articleU => {
            console.log(articleU)
            this.likedByUser = false;
            this.countLikes()

          }).catch(error => {
            alert("error4: " + error);
          })
      }
    }
  }

  //
  countLikes(){
    this.articleProvider.getById(this.article.id)
      .then(articleG => {
        console.log("articleG" + articleG)
        this.amountOfLikes = articleG['like'].length
      })
  }

}
