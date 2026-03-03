/**
 * Mock Database using LocalStorage
 * Simulates a backend for the School Management System
 */

const DB_KEY = "school_db";

const defaultData = {
  content: {
    schoolName: "Apex International Academy",
    heroTitle: "Empowering Minds, Shaping the Future",
    heroSubtitle:
      "A premium institution dedicated to excellence in education, character building, and innovation.",
    aboutText:
      "Founded in 1995, Apex International Academy has been at the forefront of quality education. We provide a holistic environment that nurtures intellectual growth and creativity.",
  },
  gallery: {
    images: [
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1519452285881-2bf008e2e98d?w=800&auto=format&fit=crop&q=60"
    ],
    videos: [
      "https://www.youtube.com/embed/dQw4w9WgXcQ"
    ]
  },
  contact: {
    email: "info@apexacademy.edu",
    whatsapp: "919876543210",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112061.0926272991!2d77.1089832!3d28.6436846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sDelhi!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
  },
  facilities: [
    { id: 1, icon: "🔬", title: "Smart Labs", desc: "State-of-the-art computer and science laboratories." },
    { id: 2, icon: "📚", title: "Digital Library", desc: "Access to thousands of e-books and research papers." },
    { id: 3, icon: "⚽", title: "Sports Complex", desc: "Indoor and outdoor sporting facilities for holistic growth." }
  ],
  testimonials: [
    { id: 1, name: "Aman Gupta", role: "Parent", text: "The Smart Labs and modern teaching methods have really helped my son's curiosity grow." },
    { id: 2, name: "Sanya Malhotra", role: "Student (Class 12)", text: "The faculty here isn't just teaching subjects, they are mentors for life. Best 2 years of my school life!" },
    { id: 3, name: "Dr. Rajesh Singh", role: "Parent", text: "Impressive focus on both sports and academics. Truly a holistic environment." }
  ],
  students: [
    {
      id: "S001",
      name: "Rahul Sharma",
      rollNo: "101",
      class: "10-A",
      email: "rahul@example.com",
      password: "pass123",
      image: "https://ui-avatars.com/api/?name=Rahul+Sharma&background=random"
    },
    {
      id: "S002",
      name: "Sriya Verma",
      rollNo: "102",
      class: "10-A",
      email: "sriya@example.com",
      password: "pass123",
      image: "https://ui-avatars.com/api/?name=Sriya+Verma&background=random"
    }
  ],
  attendance: [
    { date: "2024-03-01", studentId: "S001", status: "present" },
    { date: "2024-03-01", studentId: "S002", status: "absent" }
  ],
  leaves: [
    { id: "L001", studentId: "S002", startDate: "2024-03-05", endDate: "2024-03-07", reason: "Medical leave", status: "pending" }
  ],
  teachers: [
    {
      id: "T001",
      username: "teacher1",
      password: "password123",
      name: "Anjali Desai",
      subject: "Mathematics",
      classTeacher: "10-A",
    },
  ],
  admin: {
    username: "admin",
    password: "adminpassword",
  },
  notices: [
    {
      id: 1,
      type: "global",
      title: "Summer Holidays Declared",
      date: "2026-05-01",
      content:
        "School will remain closed for summer vacation from May 15th to June 30th.",
    },
    {
      id: 2,
      type: "assignment",
      class: "10-A",
      title: "Math Assignment 4",
      date: "2026-03-01",
      content: "Complete exercises 4.1 to 4.5 from the textbook.",
    },
  ],
  teacherLogs: [], // GPS and Camera attendance logs
  results: [
    {
      studentId: "S001",
      term: "Mid-Term",
      subjects: { Math: 85, Science: 92, English: 78, History: 88 },
    },
  ],
};

class Database {
  constructor() {
    this.init();
  }

  init() {
    if (!localStorage.getItem(DB_KEY)) {
      localStorage.setItem(DB_KEY, JSON.stringify(defaultData));
      console.log("Mock database initialized with default data.");
    }
  }

  getData() {
    return JSON.parse(localStorage.getItem(DB_KEY));
  }

  saveData(data) {
    localStorage.setItem(DB_KEY, JSON.stringify(data));
  }

  // Auth functions
  loginStudent(name, rollNo, className, password) {
    const data = this.getData();
    const student = data.students.find(
      (s) =>
        s.name.toLowerCase() === name.toLowerCase() &&
        s.rollNo === rollNo &&
        s.class === className &&
        s.password === password,
    );
    if (student) {
      sessionStorage.setItem(
        "currentUser",
        JSON.stringify({ role: "student", id: student.id }),
      );
      return true;
    }
    return false;
  }

  registerStudent(studentObj) {
    const data = this.getData();
    // Generate simple ID
    const newId = 'S' + String(data.students.length + 1).padStart(3, '0');
    
    const newStudent = {
      id: newId,
      name: studentObj.name,
      rollNo: studentObj.rollNo,
      class: studentObj.class,
      email: studentObj.email,
      mobile: studentObj.mobile,
      password: studentObj.password,
      photo: `https://ui-avatars.com/api/?name=${encodeURIComponent(studentObj.name)}&background=3b82f6&color=fff`,
      attendance: { total: 0, present: 0 },
      fees: { total: 50000, paid: 0, pending: 50000 },
    };
    
    data.students.push(newStudent);
    this.saveData(data);
    return true;
  }

  loginTeacher(username, password) {
    const data = this.getData();
    const teacher = data.teachers.find(
      (t) => t.username === username && t.password === password,
    );
    if (teacher) {
      sessionStorage.setItem(
        "currentUser",
        JSON.stringify({ role: "teacher", id: teacher.id }),
      );
      return true;
    }
    return false;
  }

  loginAdmin(username, password) {
    const data = this.getData();
    if (data.admin.username === username && data.admin.password === password) {
      sessionStorage.setItem("currentUser", JSON.stringify({ role: "admin" }));
      return true;
    }
    return false;
  }

  getCurrentUser() {
    const userStr = sessionStorage.getItem("currentUser");
    if (!userStr) return null;
    const user = JSON.parse(userStr);
    const data = this.getData();

    switch (user.role) {
      case "student":
        return {
          role: "student",
          details: data.students.find((s) => s.id === user.id),
        };
      case "teacher":
        return {
          role: "teacher",
          details: data.teachers.find((t) => t.id === user.id),
        };
      case "admin":
        return { role: "admin" };
      default:
        return null;
    }
  }

  logout() {
    sessionStorage.removeItem("currentUser");
  }
}

// Global instance
const db = new Database();
