import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';


@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) { }

  async create(createBookDto: CreateBookDto) {
    const res = await this.bookRepository.save(createBookDto);
    console.log(res);
    return res;
  }

  async findAll(): Promise<Book[] | null> {
    return await this.bookRepository.find();
  }

  async findOne(id: number): Promise<Book | null> {
    const book = await this.bookRepository.findOneBy({ id });
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const book = await this.bookRepository.findOneBy({ id });
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return await this.bookRepository.update(id, updateBookDto);
  }

  async delete(id: number) {
    const book = await this.bookRepository.findOneBy({ id });
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return await this.bookRepository.remove(book);
  }
}
