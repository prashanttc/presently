interface slides {
  id: string;
  slideNumber: number; 
  title: string; 
  content: string; 
  createdAt: Date;
  keycontent: string;
  notes: string;
  imageUrl: string;
  aifeedback: string;
  presentationId: string;
}

interface Presentation {
  id: string
  title: string
  createdAt:Date
  lastview:Date
  slides:Slide[]
}
interface Slide{
  slideNumber:number
  imageUrl:string
}