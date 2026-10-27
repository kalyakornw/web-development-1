
"use strict";

// Get elements from the HTML page
const noteForm = document.getElementById("noteForm");
const noteTitle = document.getElementById("noteTitle");
const noteDescription = document.getElementById("noteDescription");
const noteColor = document.getElementById("noteColor");
const notesContainer = document.getElementById("notesContainer");
const totalNotes = document.getElementById("totalNotes");
const completedNotes = document.getElementById("completedNotes");
const submitButton = document.getElementById("submitButton");

// Load saved notes from localStorage
let notes = JSON.parse(localStorage.getItem("postItNotes")) || [];

// Store the ID of the note currently being edited
let editingId = null;

// Save notes in the browser
function saveNotes() {
    localStorage.setItem("postItNotes", JSON.stringify(notes));
}

// Display all notes on the board
function displayNotes() {
    notesContainer.replaceChildren();

    if (notes.length === 0) {
        const message = document.createElement("p");
        message.className = "empty-message";
        message.textContent = "No notes yet. Create your first note!";
        notesContainer.appendChild(message);
    }

    notes.forEach(function (note) {
        const noteCard = document.createElement("article");
        noteCard.className = "note " + note.color;

        if (note.completed) {
            noteCard.classList.add("completed");
        }

        // Create the note title
        const title = document.createElement("h3");
        title.textContent = note.title;

        // Create the note description
        const description = document.createElement("p");
        description.textContent = note.description;

        // Create the action buttons
        const actions = document.createElement("div");
        actions.className = "note-actions";

        const completeButton = document.createElement("button");
        completeButton.type = "button";
        completeButton.textContent = note.completed
            ? "Undo"
            : "Complete";

        completeButton.addEventListener("click", function () {
            toggleComplete(note.id);
        });

        const editButton = document.createElement("button");
        editButton.type = "button";
        editButton.textContent = "Edit";

        editButton.addEventListener("click", function () {
            editNote(note.id);
        });

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";

        deleteButton.addEventListener("click", function () {
            deleteNote(note.id);
        });

        actions.append(
            completeButton,
            editButton,
            deleteButton
        );

        noteCard.append(title, description, actions);
        notesContainer.appendChild(noteCard);
    });

    // Update the statistics
    totalNotes.textContent = notes.length;

    completedNotes.textContent = notes.filter(function (note) {
        return note.completed;
    }).length;
}

// Add a new note or update an existing note
noteForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = noteTitle.value.trim();
    const description = noteDescription.value.trim();

    if (!title || !description) {
        alert("Please enter both a title and a description.");
        return;
    }

    if (editingId !== null) {
        // Update the selected note
        const note = notes.find(function (item) {
            return item.id === editingId;
        });

        if (note) {
            note.title = title;
            note.description = description;
            note.color = noteColor.value;
        }

        editingId = null;
        submitButton.textContent = "Add Note";
    } else {
        // Create a new note
        const newNote = {
            id: Date.now(),
            title: title,
            description: description,
            color: noteColor.value,
            completed: false
        };

        notes.push(newNote);
    }

    saveNotes();
    displayNotes();
    noteForm.reset();
});

// Load a note into the form for editing
function editNote(id) {
    const note = notes.find(function (item) {
        return item.id === id;
    });

    if (!note) {
        return;
    }

    noteTitle.value = note.title;
    noteDescription.value = note.description;
    noteColor.value = note.color;

    editingId = id;
    submitButton.textContent = "Save Changes";

    noteTitle.focus();
    noteForm.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

// Mark a note as completed or undo completion
function toggleComplete(id) {
    const note = notes.find(function (item) {
        return item.id === id;
    });

    if (note) {
        note.completed = !note.completed;
        saveNotes();
        displayNotes();
    }
}

// Delete a note
function deleteNote(id) {
    const confirmed = confirm("Are you sure you want to delete this note?");

    if (!confirmed) {
        return;
    }

    notes = notes.filter(function (note) {
        return note.id !== id;
    });

    if (editingId === id) {
        editingId = null;
        noteForm.reset();
        submitButton.textContent = "Add Note";
    }

    saveNotes();
    displayNotes();
}

// Show saved notes when the page opens
displayNotes();
