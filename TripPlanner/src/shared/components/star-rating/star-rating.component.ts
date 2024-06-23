import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
  standalone: true,
  imports: [MatIconModule, CommonModule],
})
export class StarRatingComponent implements OnChanges {
  @Input() rating: number = 0;
  @Output() ratingChange: EventEmitter<number> = new EventEmitter<number>();
  
  stars: boolean[] = Array(5).fill(false);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['rating']) {
      this.updateStars();
    }
  }

  updateStars() {
    this.stars = this.stars.map((_, i) => i < this.rating);
  }

  setRating(index: number) {
    this.rating = index + 1;
    this.updateStars();
    this.ratingChange.emit(this.rating);
  }
}