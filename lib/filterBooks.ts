type Book = {
  _id: string;
  title: string;
  author?: string;
  subject: string;
  grade: string;
  description: string;
  [key: string]: unknown;
};

export function filterBooks(
  books: Book[],
  search: string,
  subject: string,
  grade: string,
) {
  return books.filter((book) => {
    const query = search.toLowerCase().trim();
    const matchesSearch =
      !query ||
      book.title.toLowerCase().includes(query) ||
      book.author?.toLowerCase().includes(query) ||
      book.subject.toLowerCase().includes(query) ||
      book.grade.toLowerCase().includes(query) ||
      book.description.toLowerCase().includes(query);

    const matchesSubject =
      !subject || book.subject.toLowerCase() === subject.toLowerCase();
    const matchesGrade =
      !grade || book.grade.toLowerCase() === grade.toLowerCase();

    return matchesSearch && matchesSubject && matchesGrade;
  });
}
