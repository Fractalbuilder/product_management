FROM python:3.11-slim

WORKDIR /external_files/product_management

RUN apt-get update
RUN apt-get install -y locales locales-all tzdata

ENV LC_ALL en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US.UTF-8
ENV TZ=America/Bogota

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN apt install git nano -y

COPY requirements.txt .

RUN apt install python3-pip python3-dev libpq-dev curl nginx -y
RUN pip install --no-cache-dir -r requirements.txt --break-system-packages

EXPOSE 1011

CMD ["sh", "-c", "python manage.py makemigrations && python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]


