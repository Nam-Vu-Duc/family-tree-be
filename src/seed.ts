import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Person } from './models/Person.js';
import { Suggestion } from './models/Suggestion.js';

dotenv.config();

// Sample data - matching frontend sampleData structure
const samplePersonsData = [
  // Gen 1
  {
    id: "1",
    name: "Nguyễn Văn Tổ",
    nickname: "Cụ Tổ",
    gender: "male",
    birthYear: 1900,
    deathYear: 1975,
    birthPlace: "Hà Nội",
    hometown: "Hà Đông, Hà Nội",
    occupation: "Nông dân",
    generation: 1,
    parentId: null,
    spouseIds: ["2"],
    bio: "Người sáng lập dòng họ Nguyễn tại Hà Đông. Cụ là một nông dân cần cù, chăm chỉ và được mọi người kính trọng.",
    avatarUrl: "",
    isAlive: false,
    notes: "Mộ tại nghĩa trang làng Yên Phú",
  },
  {
    id: "2",
    name: "Trần Thị Lan",
    nickname: "Cụ Bà Lan",
    gender: "female",
    birthYear: 1905,
    deathYear: 1980,
    birthPlace: "Hà Nội",
    hometown: "Hà Đông, Hà Nội",
    occupation: "Nội trợ",
    generation: 1,
    parentId: null,
    spouseIds: ["1"],
    bio: "Vợ cụ Tổ, người phụ nữ đảm đang, nuôi dạy 4 người con thành đạt.",
    avatarUrl: "",
    isAlive: false,
    notes: "",
  },
  // Gen 2
  {
    id: "3",
    name: "Nguyễn Văn Hùng",
    nickname: "Bác Hùng",
    gender: "male",
    birthYear: 1930,
    deathYear: 2010,
    birthPlace: "Hà Đông",
    hometown: "Hà Đông, Hà Nội",
    occupation: "Giáo viên",
    generation: 2,
    parentId: "1",
    spouseIds: ["4"],
    bio: "Con trai cả, giáo viên dạy Văn cấp 3 tại trường Hà Đông. Được học trò yêu mến.",
    avatarUrl: "",
    isAlive: false,
    notes: "",
  },
  {
    id: "4",
    name: "Phạm Thị Hoa",
    nickname: "Bác gái Hoa",
    gender: "female",
    birthYear: 1935,
    deathYear: null,
    birthPlace: "Nam Định",
    hometown: "Hà Đông, Hà Nội",
    occupation: "Bác sĩ",
    generation: 2,
    parentId: null,
    spouseIds: ["3"],
    bio: "Vợ bác Hùng, bác sĩ tại bệnh viện Hà Đông, đã nghỉ hưu.",
    avatarUrl: "",
    isAlive: true,
    notes: "Hiện sống tại Hà Nội",
  },
  {
    id: "5",
    name: "Nguyễn Văn Dũng",
    nickname: "Chú Dũng",
    gender: "male",
    birthYear: 1933,
    deathYear: 2020,
    birthPlace: "Hà Đông",
    hometown: "TP. Hồ Chí Minh",
    occupation: "Kỹ sư xây dựng",
    generation: 2,
    parentId: "1",
    spouseIds: ["6"],
    bio: "Con trai thứ hai, vào Nam lập nghiệp, kỹ sư xây dựng có tiếng.",
    avatarUrl: "",
    isAlive: false,
    notes: "",
  },
  {
    id: "6",
    name: "Lê Thị Mai",
    nickname: "Thím Mai",
    gender: "female",
    birthYear: 1938,
    deathYear: null,
    birthPlace: "Huế",
    hometown: "TP. Hồ Chí Minh",
    occupation: "Kế toán",
    generation: 2,
    parentId: null,
    spouseIds: ["5"],
    bio: "Vợ chú Dũng, kế toán trưởng công ty xây dựng.",
    avatarUrl: "",
    isAlive: true,
    notes: "",
  },
  {
    id: "7",
    name: "Nguyễn Thị Hạnh",
    nickname: "Cô Hạnh",
    gender: "female",
    birthYear: 1937,
    deathYear: null,
    birthPlace: "Hà Đông",
    hometown: "Hải Phòng",
    occupation: "Giáo viên mầm non",
    generation: 2,
    parentId: "1",
    spouseIds: [],
    bio: "Con gái út, giáo viên mầm non tại Hải Phòng.",
    avatarUrl: "",
    isAlive: true,
    notes: "",
  },
  // Gen 3
  {
    id: "8",
    name: "Nguyễn Minh Tuấn",
    nickname: "Anh Tuấn",
    gender: "male",
    birthYear: 1960,
    deathYear: null,
    birthPlace: "Hà Nội",
    hometown: "Hà Nội",
    occupation: "Bác sĩ",
    generation: 3,
    parentId: "3",
    spouseIds: ["9"],
    bio: "Con trai cả bác Hùng, bác sĩ ngoại khoa Bệnh viện Bạch Mai.",
    avatarUrl: "",
    isAlive: true,
    notes: "",
  },
  {
    id: "9",
    name: "Đỗ Thị Thanh",
    nickname: "Chị Thanh",
    gender: "female",
    birthYear: 1963,
    deathYear: null,
    birthPlace: "Hà Nội",
    hometown: "Hà Nội",
    occupation: "Dược sĩ",
    generation: 3,
    parentId: null,
    spouseIds: ["8"],
    bio: "Vợ anh Tuấn, dược sĩ tại Bệnh viện Bạch Mai.",
    avatarUrl: "",
    isAlive: true,
    notes: "",
  },
  {
    id: "10",
    name: "Nguyễn Thị Ngọc",
    nickname: "Chị Ngọc",
    gender: "female",
    birthYear: 1965,
    deathYear: null,
    birthPlace: "Hà Nội",
    hometown: "Đà Nẵng",
    occupation: "Kiến trúc sư",
    generation: 3,
    parentId: "3",
    spouseIds: [],
    bio: "Con gái bác Hùng, kiến trúc sư nổi tiếng tại Đà Nẵng.",
    avatarUrl: "",
    isAlive: true,
    notes: "",
  },
  {
    id: "11",
    name: "Nguyễn Hoàng Nam",
    nickname: "Anh Nam",
    gender: "male",
    birthYear: 1962,
    deathYear: null,
    birthPlace: "TP. Hồ Chí Minh",
    hometown: "TP. Hồ Chí Minh",
    occupation: "Doanh nhân",
    generation: 3,
    parentId: "5",
    spouseIds: ["12"],
    bio: "Con trai chú Dũng, doanh nhân thành đạt trong lĩnh vực bất động sản.",
    avatarUrl: "",
    isAlive: true,
    notes: "",
  },
  {
    id: "12",
    name: "Võ Thị Hương",
    nickname: "Chị Hương",
    gender: "female",
    birthYear: 1965,
    deathYear: null,
    birthPlace: "Cần Thơ",
    hometown: "TP. Hồ Chí Minh",
    occupation: "Luật sư",
    generation: 3,
    parentId: null,
    spouseIds: ["11"],
    bio: "Vợ anh Nam, luật sư tại TP.HCM.",
    avatarUrl: "",
    isAlive: true,
    notes: "",
  },
  // Gen 4
  {
    id: "13",
    name: "Nguyễn Minh Khôi",
    nickname: "Khôi",
    gender: "male",
    birthYear: 1990,
    deathYear: null,
    birthPlace: "Hà Nội",
    hometown: "Hà Nội",
    occupation: "Kỹ sư phần mềm",
    generation: 4,
    parentId: "8",
    spouseIds: [],
    bio: "Con trai anh Tuấn, kỹ sư phần mềm tại FPT Software.",
    avatarUrl: "",
    isAlive: true,
    notes: "",
  },
  {
    id: "14",
    name: "Nguyễn Minh Anh",
    nickname: "Minh Anh",
    gender: "female",
    birthYear: 1993,
    deathYear: null,
    birthPlace: "Hà Nội",
    hometown: "Hà Nội",
    occupation: "Nhà thiết kế",
    generation: 4,
    parentId: "8",
    spouseIds: [],
    bio: "Con gái anh Tuấn, nhà thiết kế đồ họa tại Hà Nội.",
    avatarUrl: "",
    isAlive: true,
    notes: "",
  },
  {
    id: "15",
    name: "Nguyễn Hoàng Phúc",
    nickname: "Phúc",
    gender: "male",
    birthYear: 1992,
    deathYear: null,
    birthPlace: "TP. Hồ Chí Minh",
    hometown: "TP. Hồ Chí Minh",
    occupation: "Bác sĩ nha khoa",
    generation: 4,
    parentId: "11",
    spouseIds: [],
    bio: "Con trai anh Nam, bác sĩ nha khoa tại TP.HCM.",
    avatarUrl: "",
    isAlive: true,
    notes: "",
  },
  {
    id: "16",
    name: "Nguyễn Hoàng Linh",
    nickname: "Linh",
    gender: "female",
    birthYear: 1995,
    deathYear: null,
    birthPlace: "TP. Hồ Chí Minh",
    hometown: "TP. Hồ Chí Minh",
    occupation: "Sinh viên y khoa",
    generation: 4,
    parentId: "11",
    spouseIds: [],
    bio: "Con gái anh Nam, đang học y khoa tại ĐH Y Dược TP.HCM.",
    avatarUrl: "",
    isAlive: true,
    notes: "",
  },
];

const sampleSuggestionsData = [
  {
    id: "s1",
    senderName: "Nguyễn Văn An",
    senderContact: "an.nguyen@email.com",
    content: "Xin bổ sung thông tin về cụ Nguyễn Văn Tổ: Cụ từng tham gia kháng chiến chống Pháp năm 1945.",
    status: "pending",
    createdAt: "2024-03-15",
  },
  {
    id: "s2",
    senderName: "Trần Thị Bình",
    senderContact: "0912345678",
    content: "Năm sinh của cô Hạnh có thể là 1936 chứ không phải 1937. Xin kiểm tra lại.",
    status: "approved",
    createdAt: "2024-02-20",
  },
];

// Map to store old IDs to new MongoDB ObjectIds
const idMap = new Map<string, mongoose.Types.ObjectId>();

async function seedDatabase() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/family-tree';
    
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB\n');

    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await Person.deleteMany({});
    await Suggestion.deleteMany({});
    console.log('✅ Existing data cleared\n');

    // Insert persons and build ID map
    console.log('👥 Importing persons...');
    for (const personData of samplePersonsData) {
      const newPerson = await Person.create({
        name: personData.name,
        nickname: personData.nickname,
        gender: personData.gender,
        dateOfBirth: personData.birthYear ? new Date(`${personData.birthYear}-01-01`) : undefined,
        dateOfDeath: personData.deathYear ? new Date(`${personData.deathYear}-01-01`) : undefined,
        generation: personData.generation,
        birthPlace: personData.birthPlace,
        hometown: personData.hometown,
        occupation: personData.occupation,
        bio: personData.bio,
        notes: personData.notes,
        photo: personData.avatarUrl || undefined,
        isAlive: personData.isAlive,
      });

      // Store mapping of old ID to new MongoDB ID
      idMap.set(personData.id, newPerson._id);
    }
    console.log(`✅ ${samplePersonsData.length} persons imported\n`);

    // Update relationships (parentId, spouseIds, childrenIds, siblings)
    console.log('🔗 Updating relationships...');
    for (const personData of samplePersonsData) {
      const mongoId = idMap.get(personData.id);
      const updateData: any = {};

      // Set parent
      if (personData.parentId) {
        updateData.parentId = idMap.get(personData.parentId);
      }

      // Set spouse IDs array
      if (personData.spouseIds && personData.spouseIds.length > 0) {
        updateData.spouseIds = personData.spouseIds.map(id => idMap.get(id)).filter(Boolean);
      }

      // Calculate children IDs (find all people with this person as parent)
      const children = samplePersonsData.filter(p => p.parentId === personData.id);
      if (children.length > 0) {
        updateData.childrenIds = children.map(child => idMap.get(child.id)).filter(Boolean);
      }

      // Calculate siblings (find all people with same parent)
      if (personData.parentId) {
        const siblings = samplePersonsData.filter(
          p => p.parentId === personData.parentId && p.id !== personData.id
        );
        if (siblings.length > 0) {
          updateData.siblings = siblings.map(sib => idMap.get(sib.id)).filter(Boolean);
        }
      }

      if (Object.keys(updateData).length > 0) {
        await Person.findByIdAndUpdate(mongoId, updateData);
      }
    }
    console.log('✅ Relationships updated\n');

    // Insert suggestions
    console.log('💡 Importing suggestions...');
    await Suggestion.insertMany(
      sampleSuggestionsData.map(s => ({
        senderName: s.senderName,
        senderContact: s.senderContact,
        content: s.content,
        status: s.status,
        createdAt: new Date(s.createdAt),
      }))
    );
    console.log(`✅ ${sampleSuggestionsData.length} suggestions imported\n`);

    console.log('═══════════════════════════════════════');
    console.log('🎉 Database seeding completed!');
    console.log('═══════════════════════════════════════');
    console.log(`\n📊 Statistics:`);
    console.log(`   • Persons: ${samplePersonsData.length}`);
    console.log(`   • Suggestions: ${sampleSuggestionsData.length}`);
    console.log(`\n Database: ${mongoUri.split('/').pop()?.split('?')[0]}`);
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('\n✅ Disconnected from MongoDB\n');
  }
}

// Run seed script
seedDatabase();
