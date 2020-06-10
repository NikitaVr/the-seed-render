import { Hash } from './../model/types';
export class Renderer {
  static render(message: Hash) {
    return `Text Renderer ${message.time}
..................................
.                                .
.     B                          .
.                   B            .
.       B                        .
.                                .
.          B                     .
.                   H            .
.                                .
.           B                    .
..................................`;
  }
}
