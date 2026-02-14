package com.romanticquest.service;

import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.Random;

@Service
public class QuestService {

    private final Random random = new Random();

    public int[] generateBitwiseChallenge() {
        int num1 = random.nextInt(100) + 1;
        int num2 = random.nextInt(100) + 1;
        return new int[]{num1, num2};
    }

    public boolean validateXorAnswer(int num1, int num2, int answer) {
        return (num1 ^ num2) == answer;
    }

    public String getBinaryEncodedMessage() {
        return "01001001 00100000 01101100 01101111 01110110 01100101 00100000 01111001 01101111 01110101";
    }

    public boolean validateBinaryAnswer(String answer) {
        if (answer == null) {
            return false;
        }
        return answer.trim().equalsIgnoreCase("I love you");
    }

    public String getAsciiHeartArt() {
        return """
                    1111001111100     0000110000011
                  11111111111111111 00000000000000000
                 1111111111111111111000000000000000000
                111111111111111111111100000000000000000
                11111111111111111111111000000000000000011
                111111111111111111111111100000000000000111
                 11111111111111111111111110000000000001111
                 111111111111111111111111110000000000011111
                  1111111111111111111111111000000000111111
                   11111111111111111111111100000001111111
                    111111111111111111111110000011111111
                      1111111111111111111100001111111111
                       11111111111111111100111111111111
                         111111111111111111111111111
                           1111111111111111111111
                             11111111111111111
                               111111111111
                                 1111111
                                   111
                                    1
                """;
    }
}
