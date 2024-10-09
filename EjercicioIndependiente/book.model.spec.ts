import { Author } from './author';
import { Book } from './book.model';
import { mock, instance, when } from 'ts-mockito';

/*
CASO DE PRUEBA1: COMPARAR DOS LIBROS POR AUTOR Y TITULO

  - Nombre de la prueba: "Comparar dos libros por autor y título"
  - Objetivo: Verificar que el metodo equals() compare correctamente dos libros por el autor y el titulo.
  - Datos de prueba: Dos instancias de libros iguales con el author Antoine de Saint-Exupery y el titulo
    new Book('El Principito', mockAuthor, 10);
  - Resultado esperado: El metodo equals() debe devolver true ya que el autor y el titulo son iguales.
*/

describe('Book class', () => {
  let mockAuthor: Author;
  let book1: Book;

  beforeEach(() => {
    mockAuthor = mock<Author>();
    when(mockAuthor.getName()).thenReturn('Antoine de Saint-Exupery');

    book1 = new Book('El Principito', instance(mockAuthor), 5);
  });

  it('Comparar dos libros por autor y título', () => {
    let book2 = new Book('El Principito', instance(mockAuthor), 5);
    when(mockAuthor.equals('Antoine de Saint-Exupery')).thenReturn(true);

    expect(book1.equals(book2)).toBeTrue();
  });
});