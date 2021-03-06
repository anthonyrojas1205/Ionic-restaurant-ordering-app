import { Component } from "@angular/core";
import { IonicPage, NavController, LoadingController } from "ionic-angular";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

@IonicPage()
@Component({
  selector: "page-category",
  templateUrl: "category.html"
})
export class CategoryPage {
  noOfItems: any;
  public Categories: Array<any> = [];
  categories: AngularFireList<any>;

  constructor(
    public navCtrl: NavController,
    public af: AngularFireDatabase,
    public loadingCtrl: LoadingController
  ) {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present().then(() => {
      this.categories = af.list("/categories");
      this.categories.snapshotChanges().subscribe(data => {
        this.Categories = [];
        loader.dismiss();
        data.forEach(item => {
          let temp = item.payload.toJSON();
          temp["$key"] = item.payload.key;
          this.Categories.push(temp);
        });
      });
    });
  }

  ionViewWillEnter() {
    let cart: Array<any> = JSON.parse(localStorage.getItem("Cart"));
    this.noOfItems = cart != null ? cart.length : null;
  }

  navigate(id) {
    this.navCtrl.push("ProductListPage", { id: id });
  }

  navcart() {
    this.navCtrl.push("CartPage");
  }
}
