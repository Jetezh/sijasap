type fasilitasProps = {
    nama_fasilitas: string;
}

function FasilitasCard(props: fasilitasProps) {
  return (
    <div>
        <p>{props.nama_fasilitas}</p>
    </div>
  )
}

export default FasilitasCard