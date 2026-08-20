import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'skills.json');

export async function GET() {
  try {
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    const skills = JSON.parse(fileContents);
    return NextResponse.json(skills);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read skills' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { id, newSkill } = await request.json();
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    let categories = JSON.parse(fileContents);
    
    const categoryIndex = categories.findIndex(c => c.id === id);
    if (categoryIndex !== -1 && newSkill) {
      if (!categories[categoryIndex].skills.includes(newSkill)) {
          categories[categoryIndex].skills.push(newSkill);
      }
    }
    
    fs.writeFileSync(dataFilePath, JSON.stringify(categories, null, 2), 'utf8');
    return NextResponse.json({ message: 'Skill added successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save skill' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const skill = searchParams.get('skill');

    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    let categories = JSON.parse(fileContents);
    
    const categoryIndex = categories.findIndex(c => c.id === id);
    if (categoryIndex !== -1 && skill) {
        categories[categoryIndex].skills = categories[categoryIndex].skills.filter(s => s !== skill);
    }
    
    fs.writeFileSync(dataFilePath, JSON.stringify(categories, null, 2), 'utf8');
    return NextResponse.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete skill' }, { status: 500 });
  }
}
