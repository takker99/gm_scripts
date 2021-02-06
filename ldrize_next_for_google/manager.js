import {linkCard} from 'https://github.com/takker99/gm_scripts/raw/master/ldrize_next_for_google/linkCard.js';

class Manager {
  constructor() {
    this.cursor = 0;
    this.searchResult = [];
    this.started = false;
  }

  start() {
    if (this.started) return;
    // div.gが読み込まれたら初期化を開始する
    const timer = setInterval(() => {
      if (document.querySelectorAll("div.g").length === 0) return;
      this.updateItems();
      this.present.select();
      document.addEventListener("keydown", (event) => {
        // Nothing is done when the search form is focused.
        const searchForm = document.querySelector("input[class]");
        if (document.activeElement === searchForm) {
          if (event.key === "Escape" || (event.key === "[" && event.ctrlKey)) {
            event.preventDefault();
            event.stopPropagation();
            searchForm.blur();
            return false;
          }
          return true;
        }
        switch (event.key) {
          case "i":
            event.preventDefault();
            event.stopPropagation();
            searchForm.focus();
            break;
          case "j":
            this.selectNext();
            break;
          case "k":
            this.selectPrev();
            break;
          case "o":
            this.open({ newTab: true });
            break;
          case "v":
            this.open();
            break;
          case "p":
            this.togglePin();
            break;
        }
        return false;
      });
      clearInterval(timer);
    }, 100);
    this.started = true;
  }

  get present() {
    return this.searchResult[this.cursor];
  }
  get next() {
    return this.searchResult[this.cursor + 1];
  }
  get prev() {
    return this.searchResult[this.cursor - 1];
  }

  selectNext() {
    if (this.next) {
      this.present.deselect();
      this.cursor++;
      this.present.select();
    } else {
      // Reload search cards when the last card is already selected.
      // This function is for something like AutoPagerize.
      this.updateItems();
    }
    this.present.scrollIntoView(true);
    window.scrollBy(0, -(window.innerHeight * 0.2));
  }
  selectPrev() {
    // Go backword only when the previous card exists.
    if (this.prev) {
      this.present.deselect();
      this.cursor--;
      this.present.select();
    }
    this.present.scrollIntoView(true);
    window.scrollBy(0, -(window.innerHeight * 0.2));
  }

  open({ newTab = false } = {}) {
    if (!newTab) {
      document.location.href = this.present.link;
      return;
    }
    const pinCards = this.getPinCards();
    if (pinCards.length === 0) {
      window.open(this.present.link);
    } else {
      pinCards.forEach((item) => {
        window.open(item.link);
        item.unpin();
      });
    }
  }

  togglePin() {
    this.present.togglePin();
    // Go forward after pinning the present card
    this.selectNext();
  }
  updateItems() {
    this.searchResult = [...document.querySelectorAll("div.g")]
      .filter((item) => item.classList.contains("g"))
      .map((item) => new linkCard(item));
  }
  getPinCards() {
    return this.searchResult.filter((item) => item.pinned);
  }
}

export const manager = new Manager();
