import type { IHttpClient } from '@/application/ports'
import type { IRBTService } from '@/application/ports/IRBTService'
import type { IChromaticGraphService } from '@/application/ports/IChromaticGraphService'
import type { IHashTableService } from '@/application/ports/IHashTableService'
import type { IBTreeService } from '@/application/ports/IBTreeService'
import type { ITrieService } from '@/application/ports/ITrieService'
import type { ILCRSService } from '@/application/ports/ILCRSService'
import type { IHuffmanService } from '@/application/ports/IHuffmanService'
import type { ITheaterService } from '@/application/ports/ITheaterService'
import type { IAVLCursorService } from '@/application/ports/IAVLCursorService'
import type { IEncodingService } from '@/application/ports/IEncodingService'
import type { IPhysicsLabService } from '@/application/ports/IPhysicsLabService'
import { FetchHttpClient } from '@/infrastructure/adapters'
import { RBTHttpAdapter } from '@/infrastructure/adapters/rbt'
import { ChromaticGraphHttpAdapter } from '@/infrastructure/adapters/chromatic'
import { HashTableHttpAdapter } from '@/infrastructure/adapters/hashtable'
import { BTreeHttpAdapter } from '@/infrastructure/adapters/btree'
import { TrieHttpAdapter } from '@/infrastructure/adapters/trie'
import { LCRSHttpAdapter } from '@/infrastructure/adapters/lcrs'
import { HuffmanHttpAdapter } from '@/infrastructure/adapters/huffman'
import { TheaterHttpAdapter } from '@/infrastructure/adapters/theater'
import { AVLCursorHttpAdapter } from '@/infrastructure/adapters/avlcursor'
import { EncodingHttpAdapter } from '@/infrastructure/adapters/encoding'
import { PhysicsLabHttpAdapter } from '@/infrastructure/adapters/physics'

const MAIN_API_URL    = import.meta.env.VITE_API_BASE_URL      ?? 'http://localhost:8080'
const CS_MNGR_URL     = import.meta.env.VITE_CS_MNGR_URL       ?? 'http://localhost:8081'
const THEATER_URL     = import.meta.env.VITE_THEATER_MNGR_URL  ?? 'http://localhost:8085'
const ENCODING_URL    = import.meta.env.VITE_ENCODING_MNGR_URL ?? 'http://localhost:8086'
const PHYSICS_URL     = import.meta.env.VITE_PHYSICS_MNGR_URL  ?? 'http://localhost:8087'

export interface ServiceContainer {
  httpClient:            IHttpClient
  rbtService:            IRBTService
  chromaticGraphService: IChromaticGraphService
  hashTableService:      IHashTableService
  bTreeService:          IBTreeService
  trieService:           ITrieService
  lcrsService:           ILCRSService
  huffmanService:        IHuffmanService
  theaterService:        ITheaterService
  avlCursorService:      IAVLCursorService
  encodingService:       IEncodingService
  physicsLabService:     IPhysicsLabService
}

const mainHttp    = new FetchHttpClient(MAIN_API_URL)
const csMngrHttp  = new FetchHttpClient(CS_MNGR_URL)
const theaterHttp = new FetchHttpClient(THEATER_URL)

export const container: ServiceContainer = {
  httpClient:            mainHttp,
  rbtService:            new RBTHttpAdapter(csMngrHttp),
  chromaticGraphService: new ChromaticGraphHttpAdapter(csMngrHttp),
  hashTableService:      new HashTableHttpAdapter(csMngrHttp),
  bTreeService:          new BTreeHttpAdapter(csMngrHttp),
  trieService:           new TrieHttpAdapter(csMngrHttp),
  lcrsService:           new LCRSHttpAdapter(csMngrHttp),
  huffmanService:        new HuffmanHttpAdapter(csMngrHttp),
  theaterService:        new TheaterHttpAdapter(theaterHttp, THEATER_URL),
  avlCursorService:      new AVLCursorHttpAdapter(csMngrHttp),
  encodingService:       new EncodingHttpAdapter(new FetchHttpClient(ENCODING_URL)),
  physicsLabService:     new PhysicsLabHttpAdapter(new FetchHttpClient(PHYSICS_URL)),
}
