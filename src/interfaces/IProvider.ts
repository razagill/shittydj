export default interface IProvider {
  getSongStream:(url:string) => Promise<any>;
  getSongInfo:(url:string) => Promise<any>;
}