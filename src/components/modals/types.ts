export interface IModalProps {
  handleClose: () => void;
  openModal: boolean;
  options?: Array<String>;
  tod?: 'truth' | 'dare';
}
