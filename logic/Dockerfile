FROM python:3

WORKDIR /usr/src/app

COPY sa /usr/src/app

RUN pip3 install --no-cache-dir -r requirements.txt && python3 -m textblob.download_corpora

EXPOSE 5000


CMD ["python3", "./*.py"]