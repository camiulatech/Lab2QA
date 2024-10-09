import { Library } from './library.model';
import { Book } from './book.model';
import { Author } from './author';
import { mock, instance, when } from 'ts-mockito';


/*
CASO DE PRUEBA2: BUSCAR LIBROS POR AUTOR

  - Nombre de la prueba: "Buscar libros por autor"
  - Objetivo: Verificar que el metodo searchByAuthor() busque los libros de un autor.
  - Datos de prueba: El author  C.S Lewis y una libreria con los libros:
      new Book('El Principito', mockAuthor, 5);
      new Book('El leon, la bruja y el ropero', mockAuthor2, 4);
      new Book('El sobrino del mago', mockAuthor2, 5);
  - Resultado esperado: El metodo searchByAuthor() debe devolver dos libros, ya que hay dos libros que 
    fueron escritos por C.S Lewis.


CASO DE PRUEBA3: VERIFICAR SI UN LIBRO EXISTE EN LA LIBRERIA

  - Nombre de la prueba: "Verificar si un libro existe en la librería"
  - Objetivo: Verificar que el metodo contains() devuelva true si el libro existe en la librería.
  - Datos de prueba: 
    Libreria con los libros:
      new Book('El Principito', mockAuthor, 5);
      new Book('El leon, la bruja y el ropero', mockAuthor2, 4);
      new Book('El sobrino del mago', mockAuthor2, 5);
    Libro para validar:
      new Book('El Principito', mockAuthor, 5);
  - Resultado esperado: El metodo contains() debe devolver True ya que El Principito existe en la librería.


CASO DE PRUEBA4: VERIFICAR QUE UN LIBRO NO ESTA EN LA LIBRERIA

  - Nombre de la prueba: "Verificar que un libro no esta en la librería"
  - Objetivo: Comprobar que el metodo contains() devuelva false cuando un libro no existe en la libreria.
  - Datos de prueba:
    Libreria con los libros:
        new Book('El Principito', mockAuthor, 5);
        new Book('El leon, la bruja y el ropero', mockAuthor2, 4);
        new Book('El sobrino del mago', mockAuthor2, 5);
      Libro para validar:
        new Book('La Silla de Plata', mockAuthor2, 3);
  - Resultado esperado: El metodo contains() debe devolver False ya que el libro La Silla de Plata
    no esta en la libreria.

 */

    describe('Library class', () => {
      let mockAuthor: Author;
      let mockAuthor2: Author;
      let library: Library;
  
      beforeEach(() => {
          mockAuthor = mock<Author>();
          mockAuthor2 = mock<Author>();
  
          when(mockAuthor.getName()).thenReturn('Antoine de Saint-Exupery');
          when(mockAuthor2.getName()).thenReturn('C.S Lewis');
  
          library = new Library();
          let book1 = new Book('El Principito', instance(mockAuthor), 5);
          let book2 = new Book('El león, la bruja y el ropero', instance(mockAuthor2), 4);
          let book3 = new Book('El sobrino del mago', instance(mockAuthor2), 5);
          
          library.addBook(book1);
          library.addBook(book2);
          library.addBook(book3);
      });
  
      it('Buscar libros por autor', () => {
          let resultado = library.searchByAuthor('C.S Lewis');
  
          expect(resultado.size()).toBe(2); 
          expect(resultado.getBooks()[0].getTitle()).toBe('El león, la bruja y el ropero');
          expect(resultado.getBooks()[1].getTitle()).toBe('El sobrino del mago');
      });
  
      it('Verificar si un libro existe en la librería', () => {
          let book = new Book('El Principito', instance(mockAuthor), 5);
  
          when(mockAuthor.equals('Antoine de Saint-Exupery')).thenReturn(true);
  
          expect(library.contains(book)).toBeTrue();  
      });
  
      it('Verificar que un libro no está en la librería', () => {
          let book = new Book('La Silla de Plata', instance(mockAuthor2), 3);
  
          when(mockAuthor2.equals('C.S Lewis')).thenReturn(false);
  
          expect(library.contains(book)).toBeFalse(); 
      });
  });