"use client";

type BookDetailsFormProps = {
  formData: {
    title: string;
    author: string;
    isbn: string;
    subject: string;
    grade: string;
    edition: string;
    condition: string;
    description: string; 
    imageUrl: string;
  };

  updateField: (field: string, value: string) => void;
}

export function BookDetailsForm({formData, updateField}: BookDetailsFormProps) {
  return (
    <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6">
      <div>
        <h2 className="text-lg font-semibold">Book details</h2>

        <p className="mt-1 text-sm text-gray-500">
          Add the details of the book you want to share
        </p>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {/* Title */}
        <div className="sm:col-span-2">
          <label htmlFor="title" className="text-sm font-medium text-gray-700">
            Book title
          </label>

          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={(e) => updateField("title", e.target.value)}
            placeholder="e.g. NCERT Physics"
            className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-400 hover:cursor-pointer"
          />
        </div>
        {/* Author */}
        <div>
          <label htmlFor="author" className="text-sm font-medium text-gray-700">
            Author
          </label>

          <input
            id="author"
            name="author"
            type="text"
            value={formData.author}
            onChange={(e) => updateField("author", e.target.value)}
            placeholder="e.g. H.C. Verma"
            className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-400 hover:cursor-pointer"
          />
        </div>
        {/* ISBN */}
        <div>
          <label htmlFor="isbn" className="text-sm font-medium text-gray-700">
            ISBN
          </label>

          <input
            id="isbn"
            name="isbn"
            type="text"
            value={formData.isbn}
            onChange={(e) => updateField("isbn", e.target.value)}
            placeholder="e.g. 978-8174504944"
            className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-400 hover:cursor-pointer"
          />
        </div>
        {/* Subject */}
        <div>
          <label
            htmlFor="subject"
            className="text-sm font-medium text-gray-700"
          >
            Subject
          </label>

          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={(e) => updateField("subject", e.target.value)}
            className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-gray-400 hover:cursor-pointer"
          >
            <option value="" disabled>
              Select subject
            </option>

            <option value="mathematics">Mathematics</option>
            <option value="physics">Physics</option>
            <option value="chemistry">Chemistry</option>
            <option value="biology">Biology</option>
            <option value="computer-science">Computer Science</option>
            <option value="english">English</option>

            <option value="other">+ Add a subject</option>
          </select>
        </div>


        
        {/* Class / Year */}
        <div>
          <label htmlFor="grade" className="text-sm font-medium text-gray-700">
            Class / Year
          </label>

          <select
            id="grade"
            name="grade"
            value={formData.grade}
            onChange={(e) => updateField("grade", e.target.value)}
            className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-gray-400 hover:cursor-pointer"
          >
            <option value="" disabled>
              Select class / year
            </option>

            <optgroup label="School">
              <option value="class-6">Class 6</option>
              <option value="class-7">Class 7</option>
              <option value="class-8">Class 8</option>
              <option value="class-9">Class 9</option>
              <option value="class-10">Class 10</option>
              <option value="class-11">Class 11</option>
              <option value="class-12">Class 12</option>
            </optgroup>

            <optgroup label="College">
              <option value="year-1">1st Year</option>
              <option value="year-2">2nd Year</option>
              <option value="year-3">3rd Year</option>
              <option value="year-4">4th Year</option>
            </optgroup>
          </select>
        </div>
        {/* Edition */}
        <div>
          <label
            htmlFor="edition"
            className="text-sm font-medium text-gray-700"
          >
            Edition
          </label>

          <input
            id="edition"
            name="edition"
            type="text"
            value={formData.edition}
            onChange={(e) => updateField("edition", e.target.value)}
            placeholder="e.g. 5th Edition"
            className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-400 hover:cursor-pointer"
          />
        </div>
        {/* Condition */}
        <div>
          <label
            htmlFor="condition"
            className="text-sm font-medium text-gray-700"
          >
            Condition
          </label>

          <select
            id="condition"
            name="condition"
            value={formData.condition}
            onChange={(e) => updateField("condition", e.target.value)}
            className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-gray-400 hover:cursor-pointer"
          >
            <option value="" disabled>
              Select condition
            </option>

            <option value="new">New</option>
            <option value="like-new">Like New</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="well-used">Well Used</option>
          </select>
        </div>
        {/* Description */}
        <div className="sm:col-span-2">
          <label
            htmlFor="description"
            className="text-sm font-medium text-gray-700"
          >
            Description
          </label>

          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={(e) => updateField("description", e.target.value)}
            rows={4}
            placeholder="Add anything another student should know about this book..."
            className="mt-2 w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-400 hover:cursor-pointer"
          />
        </div>
      </div>
    </section>
  );
}
