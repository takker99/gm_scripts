export class linkCard {
  constructor(card) {
    if (card?.match?.("div.g")) throw Error("An invalid element");
    this._card = card;
    this._selected = false;
    this._pinned = false;
  }

  get pinned() {
    return this._pinned;
  }
  get selected() {
    return this._selected;
  }

  get link() {
    return this._card
      .getElementsByTagName("div")?.[0]
      ?.getElementsByTagName("a")?.[0]?.href;
  }

  togglePin() {
    if (!this.pinned) {
      this._setPin();
      this._pinned = true;
    } else {
      this.clear();
      if (this.selected) this._setSelect();
      this._pinned = false;
    }
  }
  pin() {
    if (this.pinned) return;
    this.togglePin();
  }
  unpin() {
    if (!this.pinned) return;
    this.togglePin();
  }

  select() {
    if (this.selected) return;
    this._setSelect();
    if (this.pinned) this._setPin();
    this._selected = true;
  }
  deselect() {
    if (!this.selected) return;
    this.clear();
    if (this.pinned) this._setPin();
    this._selected = false;
  }

  clear() {
    this._card.style = "";
  }
  scrollIntoView() {
    this._card.scrollIntoView(true);
  }

  // private functions
  _setPin() {
    this._card.style.borderLeft = "#E4645C 4px solid";
    this._card.style.paddingLeft = "4px";
  }
  _setSelect() {
    this._card.style.background = "#EFF4F8";
    this._card.style.border = "#C4E6F8 2px solid";
  }
}
