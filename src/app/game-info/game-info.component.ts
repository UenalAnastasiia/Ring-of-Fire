import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss']
})
export class GameInfoComponent implements OnInit, OnChanges {
  cardAction = [
    { title: 'Travel Quiz', description: 'What is the deepest lake in the world?' },
    { title: 'Did you know?', description: 'Freddie Mercury used to live in Munich. Freddie Mercury once had a mega birthday party in Munich that goes down in legend. However, things don’t end there. He actually lived in the city for quite some time.' },
    { title: 'Did you know?', description: 'Corals are VERY busy. Coral reefs are happening places. Even though they only take up a little less than 1% of the ocean, around 25% of all marine life calls them home. More than 4,000 different kinds of fish depend on coral reefs!' },
    { title: 'Travel Quiz', description: 'Which European capital was built on 14 islands?' },
    { title: 'Did you know?', description: 'Diamonds were used to heal. Throughout the Middle Ages, people believed diamonds could heal everything from toothaches to mental illness. This belief led to a surge in the diamond trade and hoarding by the wealthy and nobles. If only this was true today!' },
    { title: 'Travel Quiz', description: 'What is Europe`s most mountainous country?' },
    { title: 'Did you know?', description: 'Corals are really, really old. While corals are animals, they have been around for a LONG time. And they have extremely long life spans. There is evidence of coral reefs being in existence for more than 240 million years! And if you visit a coral reef today, it may be up to 10,000 years old. This is definitely one of our favorite facts about corals!' },
    { title: 'Travel Quiz', description: 'In which country is the world`s highest waterfall?' },
    { title: 'Did you know?', description: 'What`s the fastest growing plant? Any guesses? It`s the bamboo! It`s the fastest-growing plant in the world, and it can grow up to 35 inches in a day! That’s almost 1.5 inches per hour. If we pay close attention, we can actually watch bamboo grow in front of our eyes.' },
    { title: 'Travel Quiz', description: 'What`s the capital of Australia?' },
    { title: 'Travel Quiz', description: 'There are two countries that are completely land-locked in South America – name one of them?' },
    { title: 'Did you know?', description: 'Queen bees aren`t born as queens. Queen bees have many jobs, but the main one is to lay eggs. When a queen bee dies or has to leave the hive, worker bees then decide which fertilized egg will be the next queen. They do this by feeding the larvae royal jelly, along with other food. This isn’t a joke – they actually do feed it royal jelly. Amazing.' },
    { title: 'Travel Quiz', description: 'Germany`s flag is made up of what three colours?' }
  ];

  title = '';
  description = '';
  @Input() card: string;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.card) {
      let cardNumber = +this.card.split('_')[1];
      this.title = this.cardAction[cardNumber- 1].title;
      this.description = this.cardAction[cardNumber- 1].description;
    }
  }

}
