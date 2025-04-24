declare module 'pptx2json' {
    interface Shape {
      text?: string
      type?: string
      x?: number
      y?: number
      cx?: number
      cy?: number
      [key: string]: any
    }
  
    interface Slide {
      title?: string
      notes?: string
      shapes: Shape[]
    }
  
    interface Presentation {
      title?: string
      author?: string
      slides: Slide[]
    }
  
    class Pptx2Json {
      constructor()
      parse(buffer: Buffer): Promise<Presentation>
    }
  
    export = Pptx2Json
  }