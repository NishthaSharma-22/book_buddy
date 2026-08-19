"use client";

import { CameraIcon, UploadSimpleIcon } from "@phosphor-icons/react";

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
    imageFile: File | null;
  };

  updateField: (field: string, value: string | File) => void;
}

export function BookDetailsForm({formData, updateField}: BookDetailsFormProps) {
  return (
    <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        {/* Title */}
        <div>
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
            className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-400"
            required
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
            className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-400"
          />
        </div>
        {/* ISBN */}
        <div>
          <label htmlFor="isbn" className="text-sm font-medium text-gray-700">
            ISBN <span className="text-sm text-gray-600">(Optional)</span>
          </label>

          <input
            id="isbn"
            name="isbn"
            type="text"
            value={formData.isbn}
            onChange={(e) => updateField("isbn", e.target.value)}
            placeholder="e.g. 978-8174504944"
            className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-400"
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
            required
          >
            <option value="" disabled>
              Select subject
            </option>

            <option value="mathematics">Mathematics</option>
            <option value="physics">Physics</option>
            <option value="chemistry">Chemistry</option>
            <option value="biology">Biology</option>
            <option value="comp-sci">Computer Science</option>
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
            required
          >
            <option value="" disabled>
              Select class / year
            </option>

            <optgroup label="School">
              <option value="class-1">Class 1</option>
              <option value="class-2">Class 2</option>
              <option value="class-3">Class 3</option>
              <option value="class-4">Class 4</option>
              <option value="class-5">Class 5</option>
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
            className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-400"
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
            required
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
            rows={2}
            placeholder="Add anything another student should know about this book..."
            className="mt-2 w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-400"
          />
        </div>

        {/* Book Image upload */}
        <div className="sm:col-span-2">
          {/* Choose from device */}
          <input
            id="book-image"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (file) {
                updateField("imageFile", file);
              }
            }}
            className="hidden"
          />

          {/* Take photo with camera */}
          <input
            id="book-camera"
            type="file"
            accept="image/*"
            capture="environment"
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (file) {
                updateField("imageFile", file);
              }
            }}
            className="hidden"
          />

          <div className="flex gap-2">
            {/* Camera */}
            <label
              htmlFor="book-camera"
              className="inline-flex w-full items-center rounded-lg border-black bg-light-yellow px-4 py-3 text-sm font-medium transition hover:cursor-pointer hover:bg-yellow-100"
            >
              <div className="flex items-center gap-3">
                <CameraIcon size={22} weight="bold" />

                <div className="flex flex-col">
                  <span>Take a photo of book</span>
                </div>
              </div>
            </label>

            {/* Upload */}
            <label
              htmlFor="book-image"
              className="inline-flex w-full items-center rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-sm font-medium transition hover:cursor-pointer hover:bg-gray-200"
            >
              <div className="flex items-center gap-3">
                <UploadSimpleIcon size={22} />

                <div className="flex flex-col">
                  <span>Choose from device</span>
                  <span className="text-xs font-normal text-gray-400">
                    JPG, PNG, or WEBP
                  </span>
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </section>
  );
}
